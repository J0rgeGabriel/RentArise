import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Contract, FullReports } from '../../shared/interfaces';
import { ContractService } from '../../services/contract.service';
import { StatisticsService } from '../../services/statistics.service';


@Component({
  selector: 'app-relatorio',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {
  selectedReportType: string = '';
  filterStatus: string = '';
  statusOptions: string[] = ['Pendente', 'Ativo', 'Concluído', 'Cancelado', 'Recusado'];
  allStatusOptions: string[] = ['Todos', ...this.statusOptions];

  userContracts: (Contract & { statusLabel: string })[] = [];
  isLoading: boolean = true;
  reports: FullReports | null = null;

  constructor(
    private contractService: ContractService,
    private statisticsService: StatisticsService,
  ) {}

  ngOnInit(): void {
    this.statisticsService.getFullReports().subscribe({
      next: (reports) => {
        this.reports = reports;
      },
      error: (err) => {
        console.error('Erro ao carregar estatísticas:', err);
      }
    });

    this.contractService.findAllMyContracts().subscribe({
      next: contracts => {
        this.userContracts = contracts.map(contract => ({
          ...contract,
          statusLabel: this.mapStatus(contract.status)
        }));
        this.isLoading = false;
      },
      error: err => {
        console.error('Erro ao buscar contratos:', err);
        this.isLoading = false;
      }
    });
  }

  get filteredContracts() {
    if (!this.filterStatus || this.filterStatus === 'Todos') {
      return this.userContracts;
    }
    return this.userContracts.filter(c => c.statusLabel === this.filterStatus);
  }

  private mapStatus(status: Contract['status']): string {
    const statusMap: Record<Contract['status'], string> = {
      pending: 'Pendente',
      active: 'Ativo',
      completed: 'Concluído',
      cancelled: 'Cancelado',
      rejected: 'Recusado'
    };
    return statusMap[status];
  }

  get activeContracts() {
    return this.userContracts.filter(c => c.statusLabel === 'Ativo');
  }
}