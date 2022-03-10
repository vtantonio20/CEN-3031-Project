import { DashboardComponent } from './view/dashboard/dashboard.component';
import { HomeComponent } from './view/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './view/page-not-found/page-not-found.component';
import { RegistrationComponent } from './view/registration/registration.component';
import {AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
//array of objects where each object specifies a mapping of a url to a component
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const routes: Routes = [
  {path: '', redirectTo:'/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent },
  {path: 'dashboard', component:DashboardComponent},
  {path: 'registration', component:RegistrationComponent},
  //error unspecified path (** matches your url)
  {path: '**', component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
