import { Component, OnInit } from '@angular/core';
import { ILoggedUser } from 'src/app/model/auth';
import { Vehicle, VehicleData, VehiclePage } from 'src/app/model/vehiclePage';
import { AuthService } from 'src/app/services/auth.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-manage-vehicle',
  templateUrl: './manage-vehicle.component.html',
  styleUrls: ['./manage-vehicle.component.css']
})
export class ManageVehicleComponent implements OnInit {
  
  vehiclePage!: VehiclePage;
  vehicleUrl!: string;
  loggedUser!: ILoggedUser | null;
  featured!: VehicleData;
  displayAll: boolean = false;

  constructor(private vehicleService: VehicleService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loggedUser = this.authService.getCurrentUser();
    this.getVehiclesByUser();
  }

  getVehicles() {
    this.vehicleService.getVehicles(this.vehicleUrl).subscribe({
      next: (response) => {
        this.vehiclePage = response;
        this.featured = this.vehiclePage.content[0];
        
      },
      error: (error) => {
        console.log(error);
      }
    })  
  }

  deleteVehicle() {
    this.vehicleService.deleteVehicle(this.featured.vehicle.id.toString()).subscribe({
      next: (response) => {
        alert(`${this.featured.vehicle.name} was successfuly deleted.`);
        const featuredIndex = this.vehiclePage.content.indexOf(this.featured);
        this.vehiclePage.content.splice(featuredIndex, 1);
        this.featured = this.vehiclePage.content[0];
      },
      error: (error) => {
        alert(`Fail to delete ${this.featured.vehicle.name}`);
      }
    })
  }

  updateVehicle(vehicle: Vehicle) {
    this.vehicleService.putVehicle(vehicle).subscribe({
      next: (response) => {
        this.featured.vehicle = response;
        this.closeEditModal();
      },
      error: (error) => {
        alert("Fail to update vehicel");
      }
    })
  }

  updateVehiclePhoto(toBeUpdated: { formData: FormData; photoUrl: string; }) {
    this.vehicleService.putVehiclePhoto(toBeUpdated.formData, toBeUpdated.photoUrl).subscribe({
      next: (response) => {
        this.featured.pictures.splice(0, 5);
        this.getUpdatedVehicle(this.featured);
      },
      error: (error) => {
        alert("Fail to update photo");
      }
    })
  }

  getUpdatedVehicle(vehicleData: VehicleData) {
    this.vehicleService.getVehicleById(vehicleData.vehicle.id.toString()).subscribe({
      next: (response) => {
        const vehicleIndex = this.vehiclePage.content.indexOf(vehicleData);
        this.vehiclePage.content[vehicleIndex] = response;
        this.featured = response;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getVehiclesByUser() {
    this.displayAll = false;
    if(this.loggedUser) {
      this.vehicleUrl = `seller/${this.loggedUser.name}?page=0&size=10&sort=createdAt,desc`;
      this.getVehicles();
    }
  }

  getAllVehicles() {
    this.displayAll = true;
    this.vehicleUrl = `all?page=0&size=10&sort=createdAt,desc`;
    this.getVehicles();
  }

  getVehiclesSorted(sort: string) {
    const sortIndex = this.vehicleUrl.indexOf("sort");
    if (this.vehicleUrl.includes("asc")) {
      this.vehicleUrl = `${this.vehicleUrl.substring(0, sortIndex)}sort=${sort},desc`;
    } else {
      this.vehicleUrl = `${this.vehicleUrl.substring(0, sortIndex)}sort=${sort},asc`;
    }
    this.getVehicles();    
  }

  onSelectVehicle(vehicle: VehicleData) {
    this.featured = vehicle;
  }
    
  onPageChange(pageNo: Number) {
    const pageIndex = this.vehicleUrl.indexOf("page");
    const sizeIndex = this.vehicleUrl.indexOf("size");
    this.vehicleUrl = `${this.vehicleUrl.substring(0, pageIndex)}page=${pageNo}&${this.vehicleUrl.substring(sizeIndex)}`;
    this.getVehicles();
  }

  closeEditModal() {
    const modal = document.getElementById("edit_vehicle_modal") as HTMLDialogElement;
    modal.close();
  }

  isUserAdmin(): boolean | undefined {
    return this.loggedUser?.roles.includes("ADMIN");
  }
}