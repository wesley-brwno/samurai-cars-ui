import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { API_URL } from 'src/app/utils/utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  swaggerUrl: string = `${API_URL}/swagger-ui/index.html`;
  isUserLogged!: Boolean;

  constructor(public authenticationSevice: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.router.events.subscribe(() => this.isUserLogged = this.authenticationSevice.isUserLogged());
  }

  onLogin() {
    this.router.navigate(['login']);  
  }

  onLogout() {
    this.authenticationSevice.logout();
    this.router.navigate(['']);
  }
}
