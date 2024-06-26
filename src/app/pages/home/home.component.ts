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
  pageable!: string
  sellers!: string[];
  brands!: string[];
  years!: string[];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.pageable = "all?page=0&sort=createdAt,desc";
    this.getVehicles();
  }

  getVehicles() {
    this.loadingData = true;
    this.vehicleService.getVehicles(this.pageable).subscribe({
      next: (response) => {
        this.vehiclePage = response;
        this.scrollToTop();
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.loadingData = false;
        this.getBrands();
        this.getYears();
        this.getSellers();
      }
    })
  }

  getBrands() {
    this.vehicleService.getBrands().subscribe({
      next: (response) => {
        this.brands = response;        
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getYears() {
    this.vehicleService.getYears().subscribe({
      next: (response) => {
        this.years = response;               
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getSellers() {
    this.vehicleService.getSellers().subscribe({
      next: (response) => {
        this.sellers = response;                       
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onContactSeller(event: VehicleData) {
    this.vehicleTobeContacted = event;
    this.showModal();
  }

  onChangePage(pageNumber: Number) {
    const pageIndex = this.pageable.indexOf("page");
    const sortIndex = this.pageable.indexOf("sort")
    this.pageable = `${this.pageable.substring(0, pageIndex)}page=${pageNumber}&${this.pageable.substring(sortIndex)}`;  
    this.getVehicles();
  }

  onCloseModal() {
    const modal = document.getElementById("form_modal") as HTMLDialogElement;
    modal.close();    
  }

  showModal() {
    const modal = document.getElementById("form_modal") as HTMLDialogElement;
    modal.showModal();
  }

  filterBrand(event: HTMLSelectElement) {
    const value = event.value;
    this.pageable = `brand/${value}?page=0`;    
    this.getVehicles();
  }

  filterYear(event: HTMLSelectElement) {
    const value = event.value;
    this.pageable = `year/${value}?page=0`;
    this.getVehicles();
  }


  filterSeller(event: HTMLSelectElement) {
    const value = event.value;
    this.pageable = `seller/${value}?page=0`;        
    this.getVehicles();
  }
  
  searchByName() {
    const inputElement = document.getElementById("nameInput") as HTMLInputElement;
    const name = inputElement.value;
    if (name != "") {
      this.pageable = `search?name=${name}&page=0`;
      this.getVehicles();
    }    
  }

  orderVehicleBy(event: HTMLSelectElement) {
    const option = event.value;
    const pageIndex = this.pageable.indexOf("page");
    this.pageable = `${this.pageable.substring(0, pageIndex)}` + `${option === "name" ? "page=0&sort=name" : "page=0&sort="+ option+"&sort=name"}`;        
    this.getVehicles();
  }

  isFilterApplied() {
    return !this.pageable.includes("sort=createdAt,desc");
  }

  clearFilters() {
    this.pageable = "all?page=0&sort=createdAt,desc";
    this.getVehicles();
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
