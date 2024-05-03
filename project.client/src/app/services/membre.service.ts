import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MembreService {

  private BaseURL = `${environment.appUrl}/teams`;
  
  constructor(private httpClient: HttpClient) { }

  getmembre(): Observable<{database: any[]}> {
    return this.httpClient.get<{database: any[]}>(`${this.BaseURL}`);
  }
  addmembre(database: any): Observable<{ database: any[] }> {
    return this.httpClient.post<{ database: any }>(`${this.BaseURL}`, database);
  }
  DeleteService(id: any){
    console.log("iddddd00000" , id)
  }

}