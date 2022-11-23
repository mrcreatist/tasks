import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BoardModel, ItemDataModel } from '@libs/shared';
import { NotificationModel } from '../../model';
import { TaskService } from '../../service';
import { AddItemComponent } from '../add-item';
import { AddSectionComponent } from '../add-section';

@Component({
  selector: 'tasks-ui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  boards: Array<BoardModel> = [];

  constructor (
    private dialog: MatDialog,
    private task: TaskService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.subscribeNotification();
  }

  subscribeNotification() {
    this.task.listenNotification().subscribe((notification: NotificationModel<any>) => {
      if (notification.action === null) this.boards = this.task.read();
    });
  }

  addNewSection() {
    this.dialog.open(AddSectionComponent, {
      width: '250px'
    }).afterClosed().subscribe((result: string) => {
      if (result) this.task.section.create(result);
    });
  }

  addTask(board: BoardModel) {
    console.log('in here');
    this.dialog.open(AddItemComponent, {
      width: '250px'
    }).afterClosed().subscribe((result: ItemDataModel) => {
      if (result) this.task.item.create(board.id, result);
    });
  }
}
