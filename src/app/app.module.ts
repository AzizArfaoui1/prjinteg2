import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserFirstpageComponent } from './user-firstpage/user-firstpage.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { ProviderComponent } from './provider-firstpage/provider.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserSigninComponent } from './user-signin/user-signin.component';
import { ProviderSigninComponent } from './provider-signin/provider-signin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProviderDashboardComponent } from './provider-dashboard/provider-dashboard.component'; 
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
