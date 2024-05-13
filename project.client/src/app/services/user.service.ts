import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class UserService {
  private BaseURL = `${environment.appUrl}/`;
  
  constructor(private httpClient: HttpClient) { } 
  getUser(): Observable<{ userdata: any[] }> {
    return this.httpClient.get<{ userdata: any[] }>(`${this.BaseURL}`);
  }
  getUSER(userId: any): Observable<any> {
    return this.httpClient.get(`${this.BaseURL}/${userId}`);
  }
  adduser(userdata: any): Observable<{ userdata: any[] }> {
    return this.httpClient.post<{ userdata: any }>(`${this.BaseURL}`, userdata);
  }
}