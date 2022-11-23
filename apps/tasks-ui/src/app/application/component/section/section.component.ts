import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemModel, BoardModel, ItemDataModel } from '@libs/shared';
import { AddItemComponent } from '../add-item';
import { TaskService } from '../../service';
import { AddSectionComponent } from '../add-section';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'tasks-ui-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {

  ACTION = {
    DELETE: 'Delete',
    RENAME: 'Rename'
  }

  @Input() board: BoardModel;

  constructor (
    private task: TaskService,
    private dialog: MatDialog
  ) { }

  addNewItem() {
    this.dialog.open(AddItemComponent, {
      width: '250px'
    }).afterClosed().subscribe((task: ItemDataModel) => {
      if (task) this.task.item.create(this.board.id, task);
    });
  }

  updateTask(item: ItemModel) {
    this.dialog.open(AddItemComponent, {
      width: '250px', data: item
    }).afterClosed().subscribe((task: ItemDataModel) => {
      if (task) {
        this.task.item.update(this.board.id, item.id, task);
      }
    });
  }

  deleteTask(taskId: number) {
    this.task.item.delete(this.board.id, taskId);
  }

  markToggleTask(taskId: number) {
    this.task.item.markToggle(this.board.id, taskId);
  }

  drop(event: CdkDragDrop<BoardModel>) {
    this.task.drop(event);
  }

  private rename() {
    this.dialog.open(AddSectionComponent, {
      width: '250px', data: this.board
    }).afterClosed().subscribe((newName: string) => {
      if (newName) this.task.section.update(this.board.id, newName);
    });
  }

  private delete() {
    this.task.section.delete(this.board);
  }

  onAction(action: string) {
    switch (action) {
      case this.ACTION.DELETE:
        this.delete();
        break;
      case this.ACTION.RENAME:
        this.rename();
        break;
    }
  }

}
