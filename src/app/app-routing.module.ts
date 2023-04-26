import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

const routes: Routes = [
  //{path:'', redirectTo:'/peliculas', pathMatch:'full'},
  {path:'business/peliculas', component: MainComponent},
  {path:'home', component: LandingPageComponent},
  {path:'**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
