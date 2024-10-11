import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { FoodsModule } from './foods/foods.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [CustomersModule, FoodsModule, TransactionsModule],
})
export class AppModule {}
