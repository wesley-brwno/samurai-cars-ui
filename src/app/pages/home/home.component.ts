import { Component, OnInit } from '@angular/core';
import { VehicleData, VehiclePage } from 'src/app/model/vehiclePage';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  vehiclePage!: VehiclePage;
  vehicleTobeContacted!: VehicleData;
  loadingData: boolean = true;
  pageable!: string

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.pageable = "?page=0&sort=createdAt&sort=name";
    this.getVehicles();
  }

  getVehicles() {
    this.loadingData = true;
    this.vehicleService.getVehicles(this.pageable).subscribe({
      next: (response) => {
        this.vehiclePage = response;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.loadingData = false;
      }
    })
  }

  onContactSeller(event: VehicleData) {
    this.vehicleTobeContacted = event;
    this.showModal();
  }

  onChangePage(pageNumber: Number) {
    this.pageable = `?page=${pageNumber}${this.pageable.substring(7)}`;    
    this.getVehicles();
  }

  onCloseModal() {
    const modal = document.getElementById("form_modal") as HTMLDialogElement;
    modal.close();    
  }

  orderVehicleBy(event: HTMLSelectElement) {
    const option = event.value;
    this.pageable = option == "name" ? "?page=0&sort=name" : `?page=0&sort=${option}&sort=name`;
    this.getVehicles();
  }

  showModal() {
    const modal = document.getElementById("form_modal") as HTMLDialogElement;
    modal.showModal();
  }
}
