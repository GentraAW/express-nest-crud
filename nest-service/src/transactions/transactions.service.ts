import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';  
import { PrismaService } from '../prisma/prisma.service';  
import { CreateTransactionDto } from './dto/create-transaction.dto';  
import { UpdateTransactionDto } from './dto/update-transaction.dto';  
import * as moment from 'moment-timezone';
import { Transactions } from '@prisma/client'; 

@Injectable()  
export class TransactionsService {  
  constructor(private prisma: PrismaService) {}  

  async create(createTransactionDto: CreateTransactionDto) {    
    const customer = await this.prisma.customers.findUnique({  
      where: { customer_id: createTransactionDto.customer_id },  
    });  

    if (!customer) {  
      throw new NotFoundException(`Customer with ID ${createTransactionDto.customer_id} not found`);  
    }  

    const food = await this.prisma.foods.findUnique({  
      where: { food_id: createTransactionDto.food_id },  
    });  

    if (!food) {  
      throw new NotFoundException(`Food with ID ${createTransactionDto.food_id} not found`);  
    }  

    if (createTransactionDto.qty > food.stock) {  
      throw new BadRequestException(`Requested quantity (${createTransactionDto.qty}) exceeds available stock (${food.stock})`);  
    }  

    const totalPrice = food.price * createTransactionDto.qty;  

    const updatedFood = await this.prisma.foods.update({  
      where: { food_id: createTransactionDto.food_id },  
      data: {  
        stock: food.stock - createTransactionDto.qty,  
      },  
    });  

    const jakartaTime = moment().tz('Asia/Jakarta');  
    console.log('Jakarta time:', jakartaTime.format());  
    const newTransaction = await this.prisma.transactions.create({  
      data: {  
        qty: createTransactionDto.qty,  
        total_price: totalPrice,  
        customer_id: createTransactionDto.customer_id,  
        food_id: createTransactionDto.food_id,  
        transaction_date: jakartaTime.toISOString(),  
      },  
    });  

    return newTransaction;  
  }  

  findAll() {  
    return this.prisma.transactions.findMany({  
      include: {  
        customer: true,  
        food: true,  
      },  
    });  
  }  

  async findOne(id: number) {  
    const transaction = await this.prisma.transactions.findUnique({  
      where: { transaction_id: id },  
      include: {  
        customer: true,  
        food: true,  
      },  
    });  
    if (!transaction) {  
      throw new NotFoundException(`Transaction with ID ${id} not found`);  
    }  
    return transaction;  
  }  

  async update(id: number, updateTransactionDto: UpdateTransactionDto): Promise<Transactions> {  
    const existingTransaction = await this.prisma.transactions.findUnique({  
      where: { transaction_id: id },  
      include: {  
        food: true,  
      },  
    });  

    if (!existingTransaction) {  
      throw new NotFoundException(`Transaction with ID ${id} not found`);  
    }  
  
    const food = await this.prisma.foods.findUnique({  
      where: { food_id: updateTransactionDto.food_id },  
    });  

    if (!food) {  
      throw new NotFoundException(`Food with ID ${updateTransactionDto.food_id} not found`);  
    }  
 
    const stockDiff = updateTransactionDto.qty - existingTransaction.qty;  
 
    await this.prisma.foods.update({  
      where: { food_id: existingTransaction.food_id },  
      data: {  
        stock: { increment: -stockDiff },  
      },  
    });  

    const updatedTransaction = await this.prisma.transactions.update({  
      where: { transaction_id: id },  
      data: updateTransactionDto,  
    });  

    return updatedTransaction;  
  }     

  async remove(id: number): Promise<{ message: string }> {  
    const transaction = await this.prisma.transactions.findUnique({  
      where: { transaction_id: id },  
      include: {  
        food: true,  
      },  
    });  

    if (!transaction) {  
      throw new NotFoundException(`Transaction with ID ${id} not found`);  
    }  

    await this.prisma.foods.update({  
      where: { food_id: transaction.food_id },  
      data: {  
        stock: { increment: transaction.qty },  
      },  
    });  

    await this.prisma.transactions.delete({  
      where: { transaction_id: id },  
    });  

    return { message: `Transaction with ID ${id} deleted successfully` };  
  }  
}