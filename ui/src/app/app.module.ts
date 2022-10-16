import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {UsersComponent} from './pages/users/users.component';
import {HeaderComponent} from './components/header/header.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {HttpClientModule} from "@angular/common/http";
import {authInterceptorProviders} from "./_helpers/auth.interceptor";
import {JwtModule} from "@auth0/angular-jwt";
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import {ReservationsComponent} from "./pages/reservations/reservations.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import { UserComponent } from './forms/user/user.component';
import { VehicleComponent } from './forms/vehicle/vehicle.component';
import { VignetteComponent } from './forms/vignette/vignette.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import {MyreservationsComponent} from "./pages/myreservations/myreservations.component";
import { ReservationFormComponent } from './forms/reservation-form/reservation-form.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    VehiclesComponent,
    ReservationsComponent,
    NavbarComponent,
    UserComponent,
    VehicleComponent,
    VignetteComponent,
    MyreservationsComponent,
    ReservationFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        //tokenGetter: tokenGetter,
        allowedDomains: ["localhost:4200"],
        disallowedRoutes: [],
      },
    }),
    FullCalendarModule
  ],
  providers: [authInterceptorProviders, UserComponent, VehicleComponent, VignetteComponent, ReservationFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
