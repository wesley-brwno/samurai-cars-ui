import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ContactMessage } from 'src/app/model/ContactMessagePage';
import { VehicleData } from 'src/app/model/vehiclePage';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.css']
})
export class MessageModalComponent implements OnChanges{
  @Input() selectedMessage!: ContactMessage;
  vehicle!: VehicleData;

  constructor(private vehicleService: VehicleService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['selectedMessage']) {
      this.getVehicleById();
    }
  }

  ngOnInit(): void {
    this.getVehicleById();
    this.showModal();
  }

  getVehicleById() {    
    const vehicleId = this.selectedMessage.vehicle_id;
    this.vehicleService.getVehicleById(vehicleId).subscribe({
      next: (response) => {
        this.vehicle = response;
      },
      error: (error) => {
        alert("An error ocurred when retrieving vehicle data " + error.message);
      }
    })
  }

  showModal() {
    const modal = document.getElementById("message-modal") as HTMLDialogElement;
    modal.showModal();
  }

  closeModal() {
    const modal = document.getElementById("message-modal") as HTMLDialogElement;
    modal.close();
  }
}
