import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { components, providers } from './declarations';
import { MaterialModule } from '../module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: providers
})
export class LoginModule { }
