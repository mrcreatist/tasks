import { Component } from '@angular/core';
import { MainService, SettingsService } from '../../service';

@Component({
  selector: 'tasks-ui-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  constructor (
    private _main: MainService,
    private _settings: SettingsService
  ) {
    this._settings.setup();
  }

  getList() {
    return this._main.getList();
  }

}
