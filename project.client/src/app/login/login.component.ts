import { Component, OnInit } from '@angular/core';
import { MembreService } from '../services/membre.service';

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
  constructor(private membreService: MembreService) { }

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
}
