import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { VehicleData } from 'src/app/model/vehiclePage';

@Component({
  selector: 'app-featured-vehicle',
  templateUrl: './featured-vehicle.component.html',
  styleUrls: ['./featured-vehicle.component.css']
})
export class FeaturedVehicleComponent implements OnChanges{

  @Input() featuredVehicle!: VehicleData;
  @Input() showButtons: boolean = true;
  destacPhotoIndex: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    this.destacPhotoIndex = 0;
  }

  onMouseOver(photoIndex: number) {
    this.destacPhotoIndex = photoIndex;    
  }

  onShowModal() {
    const modal = document.getElementById('confirm_delete') as HTMLDialogElement;
    modal.showModal();
  }

  showEditVehicleModal() {
    const modal = document.getElementById("edit_vehicle_modal") as HTMLDialogElement;
    modal.showModal();
  }
}
