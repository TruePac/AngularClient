import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginFormComponent }   from './login-form/login-form.component';
import {PointFormComponent }   from './point-form/point-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';

@NgModule({
  exports: [ RouterModule ]  
})
export class AppRoutingModule { }
