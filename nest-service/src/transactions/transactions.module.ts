import { Module } from '@nestjs/common';  
import { TransactionsService } from './transactions.service';  
import { TransactionsController } from './transactions.controller';  
import { PrismaService } from '../prisma/prisma.service';  
import { FoodsService } from '../foods/foods.service';  

@Module({  
  controllers: [TransactionsController],  
  providers: [TransactionsService, PrismaService, FoodsService],  
})  
export class TransactionsModule {}