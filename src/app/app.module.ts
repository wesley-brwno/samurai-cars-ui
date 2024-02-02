import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './pages/admin/admin.component';
import { HeaderComponent } from './shared/header/header.component';
import { AddVehicleComponent } from './pages/add-vehicle/add-vehicle.component';
import { AuthIntercepterService } from './security/auth.intercepeter';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HeaderComponent,
    AddVehicleComponent
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
