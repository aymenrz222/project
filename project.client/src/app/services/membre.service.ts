import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators'; // Importer map depuis 'rxjs/operators'
import { Membre } from '../membre';
@Injectable({
  providedIn: 'root'
})
export class MembreService {

  private BaseURL = `${environment.appUrl}/teams`;
  
  constructor(private httpClient: HttpClient) { }
  getMembres(): Observable<Membre[]> {
    return this.httpClient.get<Membre[]>(this.BaseURL);
 
}
  getmembre(): Observable<{database: any[]}> {
    return this.httpClient.get<{database: any[]}>(`${this.BaseURL}`);
  }
  addmembre(database: any): Observable<{ database: any[] }> {
    return this.httpClient.post<{ database: any }>(`${this.BaseURL}`, database);
  }
  getmember(teamId: any): Observable<any> {
    return this.httpClient.get(`${this.BaseURL}/${teamId}`);
  }
  deletemembre(teamId: any): Observable<any> {
    return this.httpClient.delete(`${this.BaseURL}/${teamId}`);
  }
  updatemembre(database: any): Observable<{ database: any[] }> {
    return this.httpClient.put<{ database: any[] }>(`${this.BaseURL}`, database);
  }
 
  getmembreMails(): Observable<string[]> {
    return this.httpClient.get<any[]>(`${this.BaseURL}`).pipe(
      map(response => response.map(item => item.email))
    );
  }
  getMdp(): Observable<string[]> {
    return this.httpClient.get<any[]>(`${this.BaseURL}`).pipe(
      map(response => response.map(item => item.prenom))
    );
  }
  getNoms(): Observable<string[]> {
    return this.httpClient.get<any[]>(`${this.BaseURL}`).pipe(
      map(response => response.map(item => item.nom))
    );
  }
  countMembres(): Observable<number> {
    return this.getMembres().pipe(
      map(membre => membre.length)
    );
  }
}
