import { Component, OnInit } from '@angular/core';
import { AuthService, LoggedUser } from 'src/app/services/auth.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showVehicles: boolean = true;
  loggedUser!: LoggedUser | null;

  constructor(private authService: AuthService, private vehicleService: VehicleService) {}
  
  ngOnInit(): void {
    this.loggedUser = this.authService.getCurrentUser();
  }

  isUserAdmin(): boolean {
    return this.loggedUser?.roles.includes("ADMIN", 0) ? true : false;
  }
}
