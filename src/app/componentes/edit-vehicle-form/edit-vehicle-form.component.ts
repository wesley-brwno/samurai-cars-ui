import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vehicle, VehicleData } from 'src/app/model/vehiclePage';

@Component({
  selector: 'app-edit-vehicle-form',
  templateUrl: './edit-vehicle-form.component.html',
  styleUrls: ['./edit-vehicle-form.component.css']
})
export class EditVehicleFormComponent implements OnChanges {

  @Input() vehicleData!: VehicleData;
  @Output() vehicleDataEmmiter: EventEmitter<Vehicle> = new EventEmitter();
  @Output() photoRequestBodyEmmiter: EventEmitter<{ formData: FormData, photoUrl: string }> = new EventEmitter();
  vehicleForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.vehicleForm =this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      brand: ['', [Validators.required, Validators.minLength(2)]],
      model: ['', [Validators.required, Validators.minLength(2)]],
      vehicle_type: ['', [Validators.required, Validators.minLength(2)]],
      year: [0, [Validators.required, Validators.min(1950)]],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    const vehicle = this.vehicleData.vehicle;
    this.vehicleForm.setValue({
      id: vehicle.id,
      name: vehicle.name,
      brand: vehicle.brand,
      model: vehicle.model,
      vehicle_type: vehicle.vehicle_type,
      year: vehicle.year,
      price: vehicle.price
    });
  }

  ngOnInit(): void {

  }
  
  onPhotoUpload(event: any, photoId: string) {
    if (event.target.files && event.target.files[0]) {
      let photo = event.target.files[0];
      const formData = new FormData();
      formData.append('photo', photo);
      this.photoRequestBodyEmmiter.emit({formData, photoUrl: photoId});      
    }
  }

  closeEditModal() {
    const modal = document.getElementById("edit_vehicle_modal") as HTMLDialogElement;
    modal.close();
  }

  onFormSubmit() {
    this.vehicleDataEmmiter.emit(this.vehicleForm.value);
  }
}
