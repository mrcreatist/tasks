import { Component } from '@angular/core';
import { ConfigurationService, MainService } from '../../service';

@Component({
  selector: 'tasks-ui-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {

  constructor (
    private _main: MainService,
    private _config: ConfigurationService
  ) {
    if (!this._config.isConfigAvailable()) {
      this._config.setup();
    }
  }

  getList() {
    return this._main.getList();
  }

}
