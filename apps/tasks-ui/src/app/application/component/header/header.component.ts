import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BoardModel } from '@libs/shared';
import { TaskService } from '../../service';
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
    private _task: TaskService,
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
        this._task.SECTION.create(result);
      }
    });
  }

  // boardList(): Array<BoardModel> {
  //   this.updateBoardList();
  //   return this.boards;
  // }

  // addTask(board: BoardModel) {
  //   this.dialog.open(AddItemComponent, {
  //     width: '250px'
  //   }).afterClosed().subscribe(result => {
  //     if (result) {
  //       this._task.addItem(board.id, result)
  //     }
  //   });
  // }

  hasBoard() {
    // this.updateBoardList();
    return this.boards.length;
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
