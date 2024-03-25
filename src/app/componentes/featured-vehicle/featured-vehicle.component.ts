import { Component, Input, OnInit } from '@angular/core';
import { VehicleData } from 'src/app/model/vehiclePage';

@Component({
  selector: 'app-featured-vehicle',
  templateUrl: './featured-vehicle.component.html',
  styleUrls: ['./featured-vehicle.component.css']
})
export class FeaturedVehicleComponent {

  @Input() featuredVehicle!: VehicleData;
  destacPhotoIndex: number = 0;


  onMouseOver(photoIndex: number) {
    this.destacPhotoIndex = photoIndex;    
  }

}
