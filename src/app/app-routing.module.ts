import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AddVehicleComponent } from './pages/add-vehicle/add-vehicle.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "admin", component: AdminComponent },
  { path: "add-vehicle", component: AddVehicleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
