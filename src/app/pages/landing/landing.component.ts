import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { API_URL } from 'src/app/utils/utils';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  apiDocUrl: string = API_URL + "/swagger-ui/index.html#/";

  constructor(private authService: AuthService, private router: Router) {}

  onAdminClick() {
    this.authService.executeAuthentication({email: "samuraiAdmin@email.com", password: "samuraiAdmin"}).subscribe({
      next: (response) => {
        this.router.navigate(['dashboard']);
      }
    })
  }

  onUserClick() {
    this.authService.executeAuthentication({email: "xaropinho@email.com", password: "xaropinhoUser"}).subscribe({
      next: (response) => {
        this.router.navigate(['dashboard']);
      }
    })
  }
}
