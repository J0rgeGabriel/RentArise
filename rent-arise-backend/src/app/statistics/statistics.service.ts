import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ContractService } from '../contract/contract.service';
import { Status } from '../contract/enums/status.enum';
import { ProductService } from '../product/product.service';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { ContractEntity } from '../contract/entity/contract.entity';
import { ContractResponseDto } from '../contract/dto/contract-response-dto';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly userService: UserService,
    private readonly contractService: ContractService,
    private readonly productService: ProductService,
  ) {}

  async getFullStatistics(payload: JwtPayload) {
    const [user, myContracts, myProducts, contractsWithMyProducts] = await Promise.all([
      this.userService.findOne(payload.userId),
      this.contractService.findMyContracts(payload),
      this.productService.findAllMyProducts(payload),
      this.contractService.findContractsByMyProducts(payload.userId),
    ]);

    const contractStats = this.calculateContractStats(myContracts);
    const receivables = this.calculateReceivables(contractsWithMyProducts);

    return {
      profile: {
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        role: user.role,
      },
      contracts: contractStats,
      products: {
        total: myProducts.length,
      },
      receivables: {
        totalReceivables: receivables,
      },
    };
  }

  private calculateContractStats(contracts: ContractResponseDto[]) {
    const active = contracts.filter(c => c.status === Status.ACTIVE).length;

    const totalPaid = contracts
      .filter(c =>
        c.status !== Status.CANCELLED &&
        c.status !== Status.REJECTED &&
        c.status !== Status.PENDING
      )
      .reduce((sum, c) => sum + c.value, 0);

    return {
      total: contracts.length,
      active,
      totalPaid,
    };
  }

  private calculateReceivables(contracts: ContractEntity[]) {
    return contracts
      .filter(c =>
        c.status !== Status.CANCELLED &&
        c.status !== Status.REJECTED &&
        c.status !== Status.PENDING
      )
      .reduce((sum, c) => sum + c.value, 0);
  }
}
