import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './app/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './app/product/product.module';
import { ContractModule } from './app/contract/contract.module';
import { StatisticsModule } from './app/statistics/statistics.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
     TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }), UserModule, AuthModule, ProductModule, ContractModule, StatisticsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
