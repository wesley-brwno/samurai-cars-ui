import { Component, OnInit } from '@angular/core';
import { VehicleData } from 'src/app/model/vehiclePage';
import { AuthService, LoggedUser } from 'src/app/services/auth.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  vehicles!: VehicleData[];
  currentUser!: LoggedUser | null;
  featuredVehicle!: VehicleData;

  constructor(private authService: AuthService, private vehicleService: VehicleService) { }


  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.getVehicles();
  }

  private getVehicles() {
    if(this.currentUser) {
      this.vehicleService.getVehiclesByUser(this.currentUser.id).subscribe({
        next: (response) => {
          this.vehicles = response;
          this.featuredVehicle = this.vehicles[2];               
        },
        error: (error)=> {
          console.log(error);          
        }
      });
    }
  }

  onSelecVehicle(vehicle: VehicleData) {
    this.featuredVehicle = vehicle;
  }

  onConfirmDelete() {
    
  }
}
