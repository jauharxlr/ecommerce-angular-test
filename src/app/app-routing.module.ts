import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/public/login/login.component';
import { SignupComponent } from './pages/public/signup/signup.component';
import { AuthGuard } from './service/auth-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component : HomeComponent, canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
