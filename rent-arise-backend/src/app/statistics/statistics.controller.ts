import { Controller, Get, UseGuards } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { CurrentUser } from '../decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

@Controller('api/statistics')
@UseGuards(JwtAuthGuard)
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('/me')
  async getStatistics(@CurrentUser() payload: JwtPayload) {
    return await this.statisticsService.getFullStatistics(payload);
  }

  @Get('/reports')
  async getReports(@CurrentUser() payload: JwtPayload) {
    return await this.statisticsService.getReportsStatistics(payload);
  }
}
