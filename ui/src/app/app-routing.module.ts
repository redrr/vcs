import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {UsersComponent} from "./pages/users/users.component";
import {LoginComponent} from "./pages/login/login.component";
import {SecurityGuardService as SecurityGuard} from "./_services/security-guard.service";
import {VehiclesComponent} from "./pages/vehicles/vehicles.component";
import {ReservationsComponent} from "./pages/reservations/reservations.component";
import {MyreservationsComponent} from "./pages/myreservations/myreservations.component";

const routes: Routes = [
  {
    path      : 'login',
    component :  LoginComponent
  },
  {
    path: '',
    component: HomeComponent,
    canActivate : [SecurityGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate : [SecurityGuard],
    data: {
      role      : 'USERS'
    }
  },
  {
    path: 'vehicles',
    component: VehiclesComponent,
    canActivate : [SecurityGuard],
    data: {
      role      : 'VEHICLES'
    }
  },
  {
    path: 'reservations',
    component: ReservationsComponent,
    canActivate : [SecurityGuard],
    data: {
      role      : 'RESERVATIONS'
    }
  },
  {
    path: 'myreservations',
    component: MyreservationsComponent,
    canActivate : [SecurityGuard],
    data: {
      role      : 'MY_RESERVATIONS'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
