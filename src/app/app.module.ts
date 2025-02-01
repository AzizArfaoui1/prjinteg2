import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserFirstpageComponent } from './user-firstpage/user-firstpage.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { ProviderComponent } from './provider-firstpage/provider.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserSigninComponent } from './user-signin/user-signin.component';
import { ProviderSigninComponent } from './provider-signin/provider-signin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProviderDashboardComponent } from './provider-dashboard/provider-dashboard.component';
import { LocationFormComponent } from './location-form/location-form.component';
import { LocationFormProviderComponent } from './location-form-provider/location-form-provider.component';
import { ReservationComponent } from './reservation/reservation.component';
import { KeycloakService } from './services/keycloak/keycloak.service';

export function kcFactory(kcService: KeycloakService){
  return() => kcService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserFirstpageComponent,
    HomeHeaderComponent,
    ProviderComponent,
    UserDashboardComponent,
    UserSigninComponent,
    ProviderSigninComponent,
    ProviderDashboardComponent,
    LocationFormComponent,
    LocationFormProviderComponent,
    ReservationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    //HttpClient,
    //{
    //  provide: APP_INITIALIZER,
      //deps:[KeycloakService],
    //  useFactory: kcFactory,
   //   multi:true
    //}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
