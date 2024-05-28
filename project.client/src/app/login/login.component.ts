import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MembreService } from '../services/membre.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  mails: string[] = [];
  mdps: string[] = [];

  constructor(
    private membreService: MembreService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadMailsMembres();
    this.loadmdpsMembres();
  }

  loadMailsMembres() {
    this.membreService.getmembreMails().subscribe(mails => {
      this.mails = mails;
    });
  }

  loadmdpsMembres() {
    this.membreService.getMdp().subscribe(mdps => {
      this.mdps = mdps;
    });
  }

  isAdmin(username: string, password: string): boolean {
    return (username === 'wassim' || username === 'aymen') && password === 'user';
  }

  isEmployee(username: string, password: string): boolean {
    return this.mails.includes(username) && this.mdps.includes(password);
  }

  onSubmit() {
    if (this.isAdmin(this.username, this.password)) {
      this.authService.setAdminStatus(true);
      this.router.navigate(['/accueil']);
    } else if (this.isEmployee(this.username, this.password)) {
      this.authService.setAdminStatus(false);
      this.router.navigate(['/accueil']);
    }
  }
}

