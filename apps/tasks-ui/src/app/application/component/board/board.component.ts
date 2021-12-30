import { Component } from '@angular/core';
import { TaskService, SettingsService } from '../../service';

@Component({
  selector: 'tasks-ui-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  constructor (
    private _task: TaskService,
    private _settings: SettingsService
  ) { this._settings.establish() }

  getList() {
    return this._task.getList();
  }

}
