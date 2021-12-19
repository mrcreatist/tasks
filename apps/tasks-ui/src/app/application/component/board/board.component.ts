import { Component } from '@angular/core';
import { ConfigurationService, MainService } from '../../service';

@Component({
  selector: 'tasks-ui-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

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
