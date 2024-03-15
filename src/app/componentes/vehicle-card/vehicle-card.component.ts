import { Component, Input, OnInit } from '@angular/core';
import { VehicleData } from 'src/app/model/vehiclePage';

@Component({
  selector: 'vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.css']
})
export class VehicleCardComponent implements OnInit {
loggedUserId: any;
onShowContactForm(_t4: VehicleData) {
throw new Error('Method not implemented.');
}
onSeeMoreClick(arg0: number) {
throw new Error('Method not implemented.');
}
  @Input()
  vehicleData!: VehicleData[]

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
