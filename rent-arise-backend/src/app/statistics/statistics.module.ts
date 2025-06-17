import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';
import { ContractModule } from '../contract/contract.module';

@Module({
  imports: [ProductModule, UserModule, ContractModule],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
