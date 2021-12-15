import { Component } from '@angular/core';
import { ConfigurationService } from './service';

@Component({
  selector: 'tasks-ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor (
    private _config: ConfigurationService
  ) {
    if (!this._config.isConfigAvailable()) {
      this._config.setup();
    }
  }
}
