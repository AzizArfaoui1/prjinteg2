import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserFirstpageComponent } from './user-firstpage/user-firstpage.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { ProviderComponent } from './provider-firstpage/provider.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserFirstpageComponent,
    NavComponent,
    HomeHeaderComponent,
    ProviderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
