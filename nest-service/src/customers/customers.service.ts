import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto) {  
    const existingCustomer = await this.prisma.customers.findUnique({  
      where: { phone: createCustomerDto.phone },  
    });  

    if (existingCustomer) {  
      throw new BadRequestException('Phone number already exists');  
    }  

    return this.prisma.customers.create({  
      data: createCustomerDto,  
    });  
  }  

  findAll() {
    return this.prisma.customers.findMany();
  }

  async findOne(id: number) {  
    const customer = await this.prisma.customers.findUnique({  
      where: { customer_id: id },  
    });  
    if (!customer) {  
      throw new NotFoundException(`Id ${id} tidak tersedia`);  
    }  
    return customer;  
  } 

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {  
    try {  
      const existingCustomer = await this.prisma.customers.findUnique({  
        where: { phone: updateCustomerDto.phone },  
      });  

      if (existingCustomer && existingCustomer.customer_id !== id) {  
        throw new BadRequestException('Phone number already exists');  
      }  

      return await this.prisma.customers.update({  
        where: { customer_id: id },  
        data: updateCustomerDto,  
      });  
    } catch (error) {  
      if (error.code === 'P2025') {  
        throw new NotFoundException(`Id ${id} tidak tersedia`);  
      } else {  
        throw error;  
      }  
    }  
  }  

  async remove(id: number) {
    try {
      return await this.prisma.customers.delete({
        where: { customer_id: id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Id ${id} tidak tersedia`);
      }
      throw error;
    }
  }
}