import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  private BaseURL = `${environment.appUrl}/projects`;
  
  constructor(private httpClient: HttpClient) { }

  getListProjects(): Observable<{ data: any[] }> {
    return this.httpClient.get<{ data: any[] }>(`${this.BaseURL}`);
  }

  deleteProject(id: any): Observable<any> {
    return this.httpClient.delete(`${this.BaseURL}/${id}`);
  }

  // Fonction pour envoyer des données à l'API
  addData(data: any): Observable<{ data: any[] }> {
    return this.httpClient.post<{ data: any }>(`${this.BaseURL}`, data);
  }

}

