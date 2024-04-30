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

  getListProjects(): Observable<{data: any[]}> {
    return this.httpClient.get<{data: any[]}>(`${this.BaseURL}`);
  }

  DeleteService(id: any){
    console.log("iddddd00000" , id)
  }

}
