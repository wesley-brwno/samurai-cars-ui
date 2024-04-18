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

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.getVehicles("?page=0");
  }

  getVehicles(pageable: string) {
    this.vehicleService.getVehicles(pageable).subscribe({
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
    this.getVehicles(`?page=${ pageNumber }`)
  }

  onCloseModal() {
    const modal = document.getElementById("form_modal") as HTMLDialogElement;
    modal.close();    
  }

  showModal() {
    const modal = document.getElementById("form_modal") as HTMLDialogElement;
    modal.showModal();
  }
}
