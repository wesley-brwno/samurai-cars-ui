import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IVehicle } from 'src/app/model/vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {

  vehicleRequest!: FormGroup;
  vehicleResponse!: IVehicle;
  photos: any[] = new Array(5);
  sendingData: boolean = false;

  constructor(private fb: FormBuilder, private vehicleService: VehicleService, private rotuer: Router) { }

  ngOnInit(): void {
    this.vehicleRequest = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      model: ['', [Validators.required, Validators.minLength(2)]],
      brand: ['', [Validators.required, Validators.minLength(2)]],
      vehicle_type: ['', [Validators.required, Validators.minLength(2)]],
      year: ['', [Validators.required, Validators.min(1900)]],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onFormSubmit() {
    this.sendingData = true;
    this.vehicleService.postVehicle(this.vehicleRequest.value).subscribe({
      next: (response: any) => {
        this.vehicleResponse = response;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.sendingData = false;
      }
    })
  }

  onPhotosSubmit() {
    this.sendingData = true;
    this.vehicleService.postVehiclePhotos(this.getMultiPartFile(), this.vehicleResponse.id).subscribe({
      next: () => {
        this.rotuer.navigate(['dashboard']);
      },
      error: (error) => {
        alert(error.message);     
      },
      complete: () => {
        this.sendingData = false;
      }
    })
  }

  private getMultiPartFile() {
    const formData = new FormData();
    for (let photo of this.photos) {
      if (photo) {
        formData.append('photos', photo);
      }
    }
    return formData;
  }

  isAnyImageUploaded(): Boolean {
    return this.photos.some(photo => photo !== null);
  }

  onCancelClick() {
    this.rotuer.navigate(['dashboard']);
  }

  onPhotoAdded(event: any, index: number) {
    if (event.target && event.target.files[0]) {
      let photo = event.target.files[0];
      this.photos[index] = photo;
      this.getMultiPartFile();
    }
  }
}
