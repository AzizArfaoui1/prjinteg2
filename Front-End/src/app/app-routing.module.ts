import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFirstpageComponent } from './user-firstpage/user-firstpage.component';
import { HomeComponent } from './home/home.component';
import { ProviderComponent } from './provider-firstpage/provider.component';

const routes: Routes = [
  
  {path:'', title:'home', component:HomeComponent},
  {path: 'user', title:'user',component:UserFirstpageComponent},
  {path:'provider', title:'provider',component:ProviderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
''