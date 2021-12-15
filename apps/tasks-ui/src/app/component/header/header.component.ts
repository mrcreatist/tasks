import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BoardModel } from 'src/app/model';
import { MainService } from 'src/app/service';
import { SettingsComponent } from '../settings';
import { AddItemComponent } from '../add-item';
import { AddSectionComponent } from '../add-section';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  boards = [];

  constructor (
    private dialog: MatDialog,
    private _main: MainService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.updateBoardList();
  }

  updateBoardList() {
    this.boards = [];
    this._main.getList()?.forEach(item => this.boards.push(item))
  }

  addNewSection() {
    this.dialog.open(AddSectionComponent, {
      width: '250px'
    }).afterClosed().subscribe((result: string) => {
      if (result) {
        this._main.addSection(result);
      }
    });
  }

  boardList(): Array<BoardModel> {
    this.updateBoardList();
    return this.boards;
  }

  addTask(board: BoardModel) {
    this.dialog.open(AddItemComponent, {
      width: '250px'
    }).afterClosed().subscribe(result => {
      if (result) {
        this._main.addItem(board.id, result)
      }
    });
  }

  hasBoard() {
    this.updateBoardList();
    return this.boards.length
  }

  openSettings() {
    this.dialog.open(SettingsComponent, {
      width: '500px'
    }).afterClosed().subscribe(res => {
      if (res) {
        this._snackBar.open(res);
        setTimeout(() => this._snackBar.dismiss(), 3000);
      }
    })
  }
}
