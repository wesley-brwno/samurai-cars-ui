import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/header/header.component';
import { AddVehicleComponent } from './pages/add-vehicle/add-vehicle.component';
import { AuthIntercepterService } from './security/auth.intercepeter';
import { AdminComponent } from './pages/admin/admin.component';
import { VehicleListComponent } from './componentes/vehicle-list/vehicle-list.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LandingComponent } from './pages/landing/landing.component';
import { HomeComponent } from './pages/home/home.component';
import { VehicleCardComponent } from './componentes/vehicle-card/vehicle-card.component';
import { VehicleDetailsComponent } from './pages/vehicle-details/vehicle-details.component';
import { ContactFormComponent } from './componentes/contact-form/contact-form.component';
import { PageableComponent } from './componentes/pageable/pageable.component';
import { FeaturedVehicleComponent } from './componentes/featured-vehicle/featured-vehicle.component';
import { DeleteModalComponent } from './componentes/delete-modal/delete-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    AddVehicleComponent,
    AdminComponent,
    VehicleListComponent,
    FooterComponent,
    LandingComponent,
    HomeComponent,
    VehicleCardComponent,
    VehicleDetailsComponent,
    ContactFormComponent,
    PageableComponent,
    FeaturedVehicleComponent,
    DeleteModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthIntercepterService, multi:true } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
