import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

@Injectable()
export class FoodsService {
  constructor(private prisma: PrismaService) {}
  create(createFoodDto: CreateFoodDto) {
    return this.prisma.foods.create({
      data: createFoodDto,
    });
  }

  findAll() {
    return this.prisma.foods.findMany();
  }

  async findOne(id: number) {
    const food = await this.prisma.foods.findUnique({
      where: { food_id: id },
    });
    if (!food) {
      throw new NotFoundException(`Id ${id} tidak tersedia`);
    }
    return food;
  }

  async update(id: number, updateFoodDto: UpdateFoodDto) {  
    try {  
      const updatedFood = await this.prisma.foods.update({  
        where: { food_id: id },  
        data: updateFoodDto,  
      });  

      const transactions = await this.prisma.transactions.findMany({  
        where: {  
          food_id: id,  
        },  
        select: {  
          transaction_id: true,  
          qty: true,  
        },  
      });  
 
      for (const transaction of transactions) {  
        await this.prisma.transactions.update({  
          where: {  
            transaction_id: transaction.transaction_id,  
          },  
          data: {  
            total_price: transaction.qty * updateFoodDto.price,  
          },  
        });  
      }  

      return updatedFood;  
    } catch (error) {  
      if (error.code === 'P2025') {  
        throw new NotFoundException(`Food with id ${id} not found`);  
      } else {  
        throw error;  
      }  
    }  
  }

  async remove(id: number) {
    try {
      return await this.prisma.foods.delete({
        where: { food_id: id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Id ${id} tidak tersedia`);
      }
      throw error;
    }
  }
}
