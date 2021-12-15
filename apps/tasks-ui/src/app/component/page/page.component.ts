import { Component } from '@angular/core';
import { MainService } from '../../service';

@Component({
  selector: 'tasks-ui-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {

  constructor (
    private _main: MainService
  ) { }

  getList() {
    return this._main.getList();
  }

}
