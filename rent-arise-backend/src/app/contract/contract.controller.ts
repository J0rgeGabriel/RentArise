import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract-dto';
import { CurrentUser } from '../decorators/current-user.decorator';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateContractDto } from './dto/update-contract-dto';
import { Roles } from '../authorization/roles/roles.decorator';
import { Role } from '../user/enums/role.enum';
import { RolesGuard } from '../authorization/roles/roles.guard';

@Controller('api/contracts')
@UseGuards(JwtAuthGuard)
export class ContractsController {
  constructor(private readonly contractService: ContractService) {}

  @Post()
  async create(@Body() createDto: CreateContractDto, @CurrentUser() payload: JwtPayload) {
    return this.contractService.create(createDto, payload);
  }

  @Get()
  //@UseGuards(RolesGuard)
  //@Roles(Role.ADMIN)
  async findAll(@CurrentUser() payload: JwtPayload) {
    return this.contractService.findAll(payload);
  }

  @Get('/my')
  async findAllMyContracts(@CurrentUser() payload: JwtPayload) {
    return this.contractService.findMyContracts(payload);
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string){
    return this.contractService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateDto: UpdateContractDto, @CurrentUser() payload: JwtPayload) {
    return this.contractService.update(id, updateDto, payload);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string, @CurrentUser() payload: JwtPayload) {
    await this.contractService.deleteById(id, payload);
  }
}
