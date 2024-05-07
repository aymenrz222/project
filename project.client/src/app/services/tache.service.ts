import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TacheService {

  private BaseURL = `${environment.appUrl}/taches`;
  
  constructor(private httpClient: HttpClient) { }

  getTasks(): Observable<{ dbase: any[] }> {
    return this.httpClient.get<{ dbase: any[] }>(this.BaseURL);
  }

  addTask(dbase: any): Observable<{ dbase: any }> {
    return this.httpClient.post<{ dbase: any }>(this.BaseURL, dbase);
  }

  getTask(tacheId: any): Observable<any> {
    return this.httpClient.get(`${this.BaseURL}/${tacheId}`);
  }

 
  deletetache(tacheId: any): Observable<any> {
    return this.httpClient.delete(`${this.BaseURL}/${tacheId}`);
  }

  updateTask(task: any): Observable<{ task: any }> {
    return this.httpClient.put<{ task: any }>(`${this.BaseURL}`, task);
  }
 

}
