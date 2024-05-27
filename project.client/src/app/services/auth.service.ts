import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAdmin: boolean = false;
 
  setAdminStatus(isAdmin: boolean) {
    this.isAdmin = isAdmin;
  }
 
  getAdminStatus(): boolean {
    return this.isAdmin;
  }
  constructor() { }
}
