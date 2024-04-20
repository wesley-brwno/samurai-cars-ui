import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  apiDocUrl: any;

  constructor(private authService: AuthService, private router: Router) {}

  onAdminClick() {
    this.authService.executeAuthentication({email: "samuraiAdmin@email.com", password: "samuraiAdmin"}).subscribe({
      next: (response) => {
        this.router.navigate(['admin']);
      }
    })
  }

  onUserClick() {
    this.authService.executeAuthentication({email: "xaropinho@email.com", password: "xaropinhoUser"}).subscribe({
      next: (response) => {
        this.router.navigate(['admin']);
      }
    })
  }
}
