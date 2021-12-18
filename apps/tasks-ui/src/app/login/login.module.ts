import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { components, providers } from './declarations';

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    LoginRoutingModule
  ],
  providers: providers
})
export class LoginModule { }
