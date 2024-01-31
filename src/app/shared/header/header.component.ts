import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public authenticationSevice: AuthService, private router: Router) {

  }
  onLogin() {
    this.router.navigate(['login']);  
  }

  onLogout() {
    this.authenticationSevice.logout();
    this.router.navigate(['home']);
  }
}
