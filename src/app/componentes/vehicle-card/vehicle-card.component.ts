import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleData } from 'src/app/model/vehiclePage';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.css']
})
export class VehicleCardComponent {

  @Input()
  vehicleData!: VehicleData[];
  loggedUserId: any;
  toggleContactForm: boolean = true;
  @Output() contactSellerEmitter: EventEmitter<VehicleData> = new EventEmitter();

  constructor(private router: Router, authService: AuthService) {
    if (authService.isUserLogged()) {
      this.loggedUserId = authService.getCurrentUser()?.id;
    }
  }

  onSeeMoreClick(id: number) {
    this.router.navigate([`vehicle-details/${id}`]);
  }

  onShowContactForm(_t4: VehicleData) {
    throw new Error('Method not implemented.');
    // Todo
  }

  onContactClick(vehicle: VehicleData) {
    this.contactSellerEmitter.emit(vehicle);
  }

}
