import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { FullReports, FullStatistics } from "../shared/interfaces";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = `${environment.apiUrl}/statistics`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getAuthHeaders() {
    return { headers: this.authService.getAuthHeaders() };
  }

  getFullStatistics(): Observable<FullStatistics> {
    return this.http.get<FullStatistics>(`${this.apiUrl}/me`, this.getAuthHeaders());
  }

  getFullReports(): Observable<FullReports> {
    return this.http.get<FullReports>(`${this.apiUrl}/reports`, this.getAuthHeaders());
  }
}