import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFirstpageComponent } from './user-firstpage/user-firstpage.component';
import { HomeComponent } from './home/home.component';
import { ProviderComponent } from './provider-firstpage/provider.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserSigninComponent } from './user-signin/user-signin.component';
import { ProviderSigninComponent } from './provider-signin/provider-signin.component';

const routes: Routes = [
  
  {path:'', title:'home', component:HomeComponent},
  {path: 'user', title:'user',component:UserFirstpageComponent},
  {path:'provider', title:'provider',component:ProviderComponent},
  {path:'ProviderSignin',title:'ProviderSignin',component:ProviderSigninComponent},
  {path:'userDashboard',title:'userDashboard',component:UserDashboardComponent},
  {path:'UserSignin',title:'UserSignin',component:UserSigninComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
''