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
        profileIconUrl: user.profileIconUrl,
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

  async getReportsStatistics(payload: JwtPayload) {
    const [users, contracts] = await Promise.all([
      this.userService.findAll(),
      this.contractService.findAll(payload),
    ]);

    const productsRented = contracts.filter(contract =>
      !['cancelled', 'pending', 'rejected'].includes(contract.status)
    ).length;

    const contractsCompleted = contracts.filter(contract =>
      contract.status === 'completed'
    ).length;

    const totalRevenue = contracts
      .filter(contract => ['completed', 'active'].includes(contract.status))
      .reduce((sum, contract) => sum + (contract.value || 0), 0) * 0.15;

    return {
      totalUsers: users.length,
      productsRented,
      contractsCompleted,
      totalRevenue,
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
