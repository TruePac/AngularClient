import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { CustomFormsModule } from 'ng2-validation';

import { AppComponent } from './app.component';
import { PointFormComponent } from './point-form/point-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';

import { AlertComponent } from './_directives/index';
import { AlertService } from './_services/index';
import { PointService } from './point-form/point.service';


const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'point_check', component: PointFormComponent },
  { path: 'signup', component: SignupFormComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    PointFormComponent,
    LoginFormComponent,
    SignupFormComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule,
    CustomFormsModule
  ],
  providers: [AlertService, PointService],
  bootstrap: [AppComponent]
})
export class AppModule { }
