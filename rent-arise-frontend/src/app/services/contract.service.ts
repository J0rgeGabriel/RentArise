import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Contract, UpdateContractDto } from "../shared/interfaces";

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private apiUrl = `${environment.apiUrl}/contracts`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getAuthHeaders() {
    return this.authService.getAuthHeaders();
  }

  create(contract: Contract) {
    return this.http.post<Contract>(this.apiUrl, contract, {
      headers: this.getAuthHeaders()
    });
  }

  findAll(): Observable<Contract[]> {
    return this.http.get<Contract[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  findAllMyContracts(): Observable<Contract[]> {
    return this.http.get<Contract[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  findOne(id: string): Observable<Contract> {
    return this.http.get<Contract>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  update(id: string, updateData: UpdateContractDto): Observable<Contract> {
    return this.http.put<Contract>(`${this.apiUrl}/${id}`, updateData, {
      headers: this.getAuthHeaders()
    });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}