import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractsController } from './contract.controller';
import { ContractEntity } from './entity/contract.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContractEntity]),
    UserModule,
    ProductModule,
  ],
  controllers: [ContractsController],
  providers: [ContractService],
  exports: [ContractService]
})
export class ContractModule {}
