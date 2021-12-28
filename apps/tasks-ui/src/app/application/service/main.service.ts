import { Injectable } from '@angular/core';
import { ItemModel, BoardModel, ItemDataModel, SettingsModel, SortModeEnum, StorageModeEnum } from '@libs/shared';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { SocketService } from './socket.service';
import { ConfigurationService } from './configuration.service';
@Injectable({
  providedIn: 'root'
})
export class MainService {

  private storageMode: StorageModeEnum;
  private sortMode: SortModeEnum;
  private lists: Array<BoardModel> = [];

  constructor (
    private _socket: SocketService,
    private _config: ConfigurationService
  ) {
    switch (this.storageMode) {
      case StorageModeEnum.SOCKET:
        this._socket.initializeSocket((data: Array<BoardModel>) => (console.log(data), this.updateTasks(data)));
        break;
      case StorageModeEnum.LOCAL_STORAGE:
      default:
        setTimeout(() => this.updateTasks([]))
        break;
    }
  }

  setStorageMode(storage: StorageModeEnum) {
    this.storageMode = storage;
  }

  setSortMode(mode: SortModeEnum) {
    this.sortMode = mode;
  }

  updateTasks(data: Array<BoardModel>) {
    switch (this.storageMode) {
      case StorageModeEnum.SOCKET: {
        this.lists = (data === null ? [] : data);
        break;
      }
      default:
      case StorageModeEnum.LOCAL_STORAGE: {
        const item = localStorage.getItem('data');
        if (item) {
          this.lists = JSON.parse(item);
        }
        break;
      }
    }
  }

  private syncData() {
    if (this.lists) {
      switch (this.storageMode) {
        case StorageModeEnum.SOCKET:
          this._socket.sendData(this.lists);
          break;
        case StorageModeEnum.LOCAL_STORAGE:
        default:
          localStorage.setItem('data', JSON.stringify(this.lists));
          this.updateTasks(this.lists);
          break;
      }
    }
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
    this.syncData();
  }

  deleteSection(list: BoardModel) {
    const tempList: Array<BoardModel> = [];
    this.lists.forEach((l: BoardModel) => {
      if (l.id !== list.id) {
        tempList.push(l);
      }
    });
    this.lists = tempList;
    this.syncData();
  }

  renameSection(list: BoardModel, newName: string) {
    this.lists.forEach((l: BoardModel) => {
      if (l.id === list.id) {
        l.name = newName;
        l.created = this.getTimeStamp();
      }
    });
    this.syncData();
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

    if (this.sortMode === SortModeEnum.BY_CREATED) {
      const element = this.lists.find((e: BoardModel) => e.id === id);
      if (element) {
        const current = this.lists.indexOf(element);
        this.sortByTime(current);
      }
    }

    this.syncData();
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
    this.syncData();
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
    this.syncData();
  }

  // SORT FUNCTION

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
    switch (this.sortMode) {
      case SortModeEnum.BY_CREATED: {
        this.sortByTime(current)
        break;
      }
      case SortModeEnum.FREE_FALL:
      default: {
        break;
      }
    }

    this.syncData();
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
