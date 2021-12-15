import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddItemComponent } from 'src/app/component/add-item/add-item.component';
import { ItemModel, BoardModel, ItemDataModel } from 'src/app/model';
import { MainService } from 'src/app/service';
import { AddSectionComponent } from '../add-section';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {

  ACTION = {
    DELETE: 'Delete',
    RENAME: 'Rename'
  }

  @Input() list: BoardModel;

  constructor (
    private _main: MainService,
    private dialog: MatDialog
  ) { }

  addNewItem() {
    this.dialog.open(AddItemComponent, {
      width: '250px'
    }).afterClosed().subscribe((result: ItemDataModel) => {
      if (result) {
        this._main.addItem(this.list.id, result)
      }
    });
  }

  updateItem(item: ItemModel) {
    this.dialog.open(AddItemComponent, {
      width: '250px', data: item
    }).afterClosed().subscribe(result => {
      if (result) {
        this._main.updateItem(item, result);
      }
    });
  }

  private _renameSection() {
    this.dialog.open(AddSectionComponent, {
      width: '250px', data: this.list
    }).afterClosed().subscribe((result: string) => {
      if (result) {
        this._main.renameSection(this.list, result);
      }
    });
  }

  private _deleteSection() {
    this._main.deleteSection(this.list);
  }

  drop(event: any) {
    this._main.drop(event);
  }

  onAction(action: string) {
    switch (action) {
      case this.ACTION.DELETE:
        this._deleteSection();
        break;
      case this.ACTION.RENAME:
        this._renameSection();
        break;
    }
  }

}
