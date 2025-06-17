import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { UpdateUserDto, User } from "../shared/interfaces";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = `${environment.apiUrl}/users`;
  
    constructor(
      private http: HttpClient,
      private authService: AuthService
    ) {}
  
    private getAuthHeaders() {
      return this.authService.getAuthHeaders();
    }
  
    findAll(): Observable<User[]> {
      return this.http.get<User[]>(this.apiUrl, {
        headers: this.getAuthHeaders()
      });
    }
  
    findOne(id: string): Observable<User> {
      return this.http.get<User>(`${this.apiUrl}/${id}`, {
        headers: this.getAuthHeaders()
      });
    }
  
    update(id: string, updateData: UpdateUserDto): Observable<User> {
      return this.http.put<User>(`${this.apiUrl}/${id}`, updateData, {
        headers: this.getAuthHeaders()
      });
    }
  
    delete(id: string): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`, {
        headers: this.getAuthHeaders()
      });
    }
}