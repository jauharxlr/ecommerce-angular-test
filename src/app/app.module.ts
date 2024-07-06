import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/public/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/public/signup/signup.component';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './dialog/add-product/add-product.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
