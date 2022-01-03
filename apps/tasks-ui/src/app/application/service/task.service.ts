import { Injectable } from '@angular/core';
import { ItemModel, BoardModel, ItemDataModel, SortModeEnum, SettingsModel } from '@libs/shared';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ActionService } from './action.service';
import { SettingsService } from './settings.service';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private lists: Array<BoardModel> = [];
  private setting: SettingsModel;

  constructor (
    private _action: ActionService,
    private _settings: SettingsService
  ) {
    this.setting = this._settings.getSettings();
    this.update(this._action.getData())
  }

  update(data: Array<BoardModel>) {
    this._action.storageTemplate(
      this.setting,
      () => this.lists = this._action.readLocalTasks() ? this._action.readLocalTasks() : [],
      () => this.lists = (data === null ? [] : data));
  }

  // BOARD OPERATIONS

  addSection(name: string) {
    const section: BoardModel = {
      id: this._getId(),
      name: name,
      data: [],
      created: this.getTimeStamp()
    };
    this.lists.push(section);
    this._action.syncData(this.setting, this.lists, (data: Array<BoardModel>) => this.update(data));
  }

  deleteSection(list: BoardModel) {
    const tempList: Array<BoardModel> = [];
    this.lists.forEach((l: BoardModel) => {
      if (l.id !== list.id) {
        tempList.push(l);
      }
    });
    this.lists = tempList;
    this._action.syncData(this.setting, this.lists, (data: Array<BoardModel>) => this.update(data));
  }

  renameSection(list: BoardModel, newName: string) {
    this.lists.forEach((l: BoardModel) => {
      if (l.id === list.id) {
        l.name = newName;
        l.created = this.getTimeStamp();
      }
    });
    this._action.syncData(this.setting, this.lists, (data: Array<BoardModel>) => this.update(data));
  }

  // TASK OPERATIONS

  addItem(id: number, item: ItemDataModel) {
    const data: ItemModel = {
      id: this._getId(),
      title: item.title,
      description: item.description,
      completed: false,
      created: this.getTimeStamp()
    };
    this.lists.find((e: BoardModel) => e.id === id)?.data.push(data)

    if (this.setting.SORT_MODE === SortModeEnum.BY_CREATED) {
      const element = this.lists.find((e: BoardModel) => e.id === id);
      if (element) {
        const current = this.lists.indexOf(element);
        this.sortByTime(current);
      }
    }

    this._action.syncData(this.setting, this.lists, (data: Array<BoardModel>) => this.update(data));
  }

  markItem(item: ItemModel) {
    this.lists.forEach((l: BoardModel) => {
      l.data.forEach((i: ItemModel) => {
        if (i.id === item.id) {
          i.completed = !i.completed;
        }
      })
    })
  }

  updateItem(item: ItemModel, newItem: ItemDataModel) {
    this.lists.forEach((l: BoardModel) => {
      l.data.forEach((i: ItemModel) => {
        if (i.id === item.id) {
          i.title = newItem.title;
          i.description = newItem.description;
          i.created = this.getTimeStamp();
        }
      });
    })
    this._action.syncData(this.setting, this.lists, (data: Array<BoardModel>) => this.update(data));
  }

  deleteItem(item: ItemModel) {
    const tempList: Array<BoardModel> = [];
    this.lists.forEach((l: BoardModel) => {
      const tempItems: Array<ItemModel> = [];
      l.data.forEach((i: ItemModel) => {
        if (i.id !== item.id) {
          tempItems.push(i);
        }
      });
      l.data = tempItems;
      tempList.push(l);
    });
    this.lists = tempList;
    this._action.syncData(this.setting, this.lists, (data: Array<BoardModel>) => this.update(data));
  }

  // SORT FUNCTION

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  drop(event: any) {
    let previous, current;
    if (event.previousContainer === event.container) {
      current = this.lists.indexOf(event.container.data);
      moveItemInArray(this.lists[current].data, event.previousIndex, event.currentIndex);
    } else {
      previous = this.lists.indexOf(event.previousContainer.data);
      current = this.lists.indexOf(event.container.data);
      transferArrayItem(this.lists[previous].data, this.lists[current].data, event.previousIndex, event.currentIndex);
    }
    switch (this.setting.SORT_MODE) {
      case SortModeEnum.BY_CREATED: {
        this.sortByTime(current)
        break;
      }
      case SortModeEnum.FREE_FALL:
      default: {
        break;
      }
    }

    this._action.syncData(this.setting, this.lists, (data: Array<BoardModel>) => this.update(data));
  }

  sortByTime(current: number) {
    this.lists[current].data.sort((a, b) => b.created - a.created);
  }

  // HELPER FUNCTIONS

  private _getId() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  getList(): Array<BoardModel> {
    return this.lists;
  }

  private getTimeStamp(): number {
    return Date.now();
  }

}
