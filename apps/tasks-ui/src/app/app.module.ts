import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { components, dialogs, providers } from './declaration';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@libs/shared';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ...components,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: providers,
  entryComponents: dialogs,
  bootstrap: [AppComponent],
})
export class AppModule { }
