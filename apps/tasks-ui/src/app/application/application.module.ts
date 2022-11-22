import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components, providers, dialogs } from './declaration';
import { ApplicationRoutingModule } from './application-routing.module';
import { MaterialModule } from '../module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: providers,
  entryComponents: dialogs
})
export class ApplicationModule { }
