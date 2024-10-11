import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, ParseIntPipe } from '@nestjs/common';  
import { TransactionsService } from './transactions.service';  
import { CreateTransactionDto } from './dto/create-transaction.dto';  
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { FoodsService } from '../foods/foods.service';    
import { Transactions } from '@prisma/client'; 

@Controller('transaction')  
export class TransactionsController {  
  constructor(  
    private readonly transactionsService: TransactionsService,  
    private readonly foodsService: FoodsService,  
  ) {}  
 
  @Post()  
  async create(@Body() createTransactionDto: CreateTransactionDto) {  
    return this.transactionsService.create(createTransactionDto);  
  }

  @Get()  
  findAll() {  
    return this.transactionsService.findAll();  
  }  

  @Get(':id')  
  async findOne(@Param('id') id: string) {  
    try {  
      return await this.transactionsService.findOne(+id);  
    } catch (error) {  
      if (error instanceof NotFoundException) {  
        throw new NotFoundException(error.message);  
      }  
      throw error;  
    }  
  }  

  @Put(':id')  
  async updateTransaction(  
    @Param('id', ParseIntPipe) id: number,  
    @Body() updateTransactionDto: UpdateTransactionDto  
  ): Promise<Transactions> {  
    return this.transactionsService.update(id, updateTransactionDto);  
  }   

  @Delete(':id')  
  async remove(@Param('id') id: string) {  
    try {  
      return await this.transactionsService.remove(+id);  
    } catch (error) {  
      if (error instanceof NotFoundException) {  
        throw new NotFoundException(error.message);  
      }  
      throw error;  
    }  
  }  
}