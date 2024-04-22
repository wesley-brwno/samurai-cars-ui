import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleData } from 'src/app/model/vehiclePage';

@Component({
  selector: 'vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.css']
})
export class VehicleCardComponent {

  @Input()vehicleData!: VehicleData[];
  @Input() showContacButton: boolean = true;
  @Output() contactSellerEmitter: EventEmitter<VehicleData> = new EventEmitter();

  constructor(private router: Router) {
  }

  onSeeMoreClick(id: number) {
    this.router.navigate([`vehicle-details/${id}`]);
  }

  onContactClick(vehicle: VehicleData) {
    this.contactSellerEmitter.emit(vehicle);
  }
}
