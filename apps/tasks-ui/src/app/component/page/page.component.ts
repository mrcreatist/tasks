import { Component } from '@angular/core';
import { BoardModel } from 'src/app/model';
import { MainService } from '../../service';

@Component({
  selector: 'app-page',
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
