import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateFoodDto {
    @IsString()
    @IsNotEmpty()
    food_name: string;
  
    @IsInt()
    @IsNotEmpty()
    price: number;
  
    @IsInt()
    @IsNotEmpty()
    stock: number;
}
