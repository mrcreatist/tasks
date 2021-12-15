import { Component } from '@angular/core';
import { ConfigurationService } from './service';

@Component({
  selector: 'tasks-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor (
    private _config: ConfigurationService
  ) {
    if (!this._config.isAvailable()) {
      this._config.setup();
    }
  }
}
