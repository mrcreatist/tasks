import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BoardModel } from '@libs/shared';
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
    // this.updateBoardList();
  }

  // updateBoardList() {
  //   this.boards = [];
  //   // this._task.getList()?.forEach((item: BoardModel) => this.boards.push(item));
  // }

  addNewSection() {
    this.dialog.open(AddSectionComponent, {
      width: '250px'
    }).afterClosed().subscribe((result: string) => {
      if (result) {
        this.task.section.create(result);
      }
    });
  }

  boardList(): Array<BoardModel> {
    return this.task.read();
  }

  addTask(board: BoardModel) {
    this.dialog.open(AddItemComponent, {
      width: '250px'
    }).afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        // this._task.addItem(board.id, result)
      }
    });
  }

  // openSettings() {
  //   this.dialog.open(SettingsComponent, {
  //     width: '500px'
  //   }).afterClosed().subscribe(res => {
  //     if (res) {
  //       this._snackBar.open(res);
  //       setTimeout(() => this._snackBar.dismiss(), 3000);
  //     }
  //   });
  // }
}
