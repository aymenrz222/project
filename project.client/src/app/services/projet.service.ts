import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  constructor(private http: HttpClient) { }

  // Exemple de méthode pour récupérer des données depuis l'API
  getDonnees(): Observable<any> {
    return this.http.get<any>('https://localhost:44369/swagger/index.html');
  }
}
