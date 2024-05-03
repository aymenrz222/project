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

  gettache(): Observable<{DataBASE: any[]}> {
    return this.httpClient.get<{DataBASE: any[]}>(`${this.BaseURL}`);
  }

 

}