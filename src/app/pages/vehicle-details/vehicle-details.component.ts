import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehicleData } from 'src/app/model/vehiclePage';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {
  vehicleData!: VehicleData;
  vehicles!: VehicleData[];

  constructor(private vehicleService: VehicleService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const vehicleId = params['id'];
      this.getVehicle(vehicleId);
    });
  }

  getVehicle(id: string) {
    this.vehicleService.getVehicleById(id).subscribe({
      next: (response) => {
        this.vehicleData = response;
        this.getVehiclesByUser();      
      },
      error: (error) => {
        console.log(error);        
      },
      complete: () => {}
    })
  }

  getVehiclesByUser() {
    this.vehicleService.getVehiclesByUser(this.vehicleData.vehicle.user_id.toString()).subscribe({
      next: (response) => {
        this.vehicles = response;
      },
      error: (error) => {
        console.log(error);        
      }
    })
  }

}
