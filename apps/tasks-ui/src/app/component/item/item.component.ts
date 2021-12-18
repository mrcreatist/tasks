import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemModel } from '@libs/shared';
import { MainService } from '../../service';

@Component({
  selector: 'tasks-ui-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  ACTION = {
    MARK_AS_DONE: 'Mark as Done',
    MARK_AS_UNDONE: 'Mark as Undone',
    DELETE: 'Delete',
    UPDATE: 'Update'
  }

  @Input() item: ItemModel;
  @Output() update = new EventEmitter<ItemModel>();

  constructor (
    private _main: MainService,
    private dialog: MatDialog
  ) { }

  onAction(action: string) {
    switch (action) {
      case this.ACTION.MARK_AS_DONE:
      case this.ACTION.MARK_AS_UNDONE:
        this._main.markItem(this.item);
        break;
      case this.ACTION.DELETE:
        this._main.deleteItem(this.item);
        break;
      case this.ACTION.UPDATE:
        this.update.emit(this.item);
        break;
    }
  }

}
