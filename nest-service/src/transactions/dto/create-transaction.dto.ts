import { IsInt, IsNotEmpty, Min, Max } from 'class-validator';  
import { FoodsService } from '../../foods/foods.service';  
import { BadRequestException } from '@nestjs/common';  

export class CreateTransactionDto {  
  @IsInt()  
  @IsNotEmpty()  
  @Min(1)  
  qty: number;  

  @IsInt()  
  @IsNotEmpty()  
  customer_id: number;  

  @IsInt()  
  @IsNotEmpty()  
  food_id: number;  
}  