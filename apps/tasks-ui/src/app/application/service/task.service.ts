import { Injectable } from '@angular/core';
import { ItemModel, BoardModel, ItemDataModel, SOCKET_EVENT } from '@libs/shared';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { StorageService } from './storage.service';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  notify = new BehaviorSubject<any>(null);

  constructor (
    private storage: StorageService
  ) { }

  SECTION = {
    add: (name: string) => {
      const section: BoardModel = {
        id: this._getId(),
        name: name,
        data: [],
        created: this.getTimeStamp()
      };
      // const list = this.getList();
      // list.push(section);
      // this._action.writeTasks(list)
      // this._action.syncData(list);
      // this.SOCKET_OPERATION[SOCKET_EVENT.CREATE](section);

      this.newItem(section);
      // this.socket.emit(SOCKET_EVENT.CREATE, section);
    },
    // delete: (item: BoardModel) => {
    //   let list = this.getList();
    //   const tempList: Array<BoardModel> = [];
    //   list.forEach((l: BoardModel) => {
    //     if (l.id !== item.id) {
    //       tempList.push(l);
    //     }
    //   });
    //   list = tempList;
    //   // this._action.syncData(list);
    // },
    // rename: (item: BoardModel, newName: string) => {
    //   const list = this.getList();
    //   list.forEach((l: BoardModel) => {
    //     if (l.id === item.id) {
    //       l.name = newName;
    //       l.created = this.getTimeStamp();
    //     }
    //   });
    //   // this._action.syncData(list);
    // }
  }

  // ITEM = {
  //   addItem: (id: number, item: ItemDataModel) => {
  //     const list = this.getList();
  //     const data: ItemModel = {
  //       id: this._getId(),
  //       title: item.title,
  //       description: item.description,
  //       completed: false,
  //       created: this.getTimeStamp()
  //     };
  //     list.find((e: BoardModel) => e.id === id)?.data.push(data)

  //     // if (this.setting.SORT_MODE === SortModeEnum.BY_CREATED) {
  //     //   const element = list.find((e: BoardModel) => e.id === id);
  //     //   if (element) {
  //     //     const current = list.indexOf(element);
  //     //     this.sortByTime(current);
  //     //   }
  //     // }

  //     // this._action.syncData(list);
  //   },
  //   markItem: (item: ItemModel) => {
  //     const list = this.getList();
  //     list.forEach((l: BoardModel) => {
  //       l.data.forEach((i: ItemModel) => {
  //         if (i.id === item.id) {
  //           i.completed = !i.completed;
  //         }
  //       })
  //     })
  //   },
  //   updateItem: (item: ItemModel, newItem: ItemDataModel) => {
  //     const list = this.getList();
  //     list.forEach((l: BoardModel) => {
  //       l.data.forEach((i: ItemModel) => {
  //         if (i.id === item.id) {
  //           i.title = newItem.title;
  //           i.description = newItem.description;
  //           i.created = this.getTimeStamp();
  //         }
  //       });
  //     })
  //     // this._action.syncData(list);
  //   },
  //   deleteItem: (item: ItemModel) => {
  //     let list = this.getList();
  //     const tempList: Array<BoardModel> = [];
  //     list.forEach((l: BoardModel) => {
  //       const tempItems: Array<ItemModel> = [];
  //       l.data.forEach((i: ItemModel) => {
  //         if (i.id !== item.id) {
  //           tempItems.push(i);
  //         }
  //       });
  //       l.data = tempItems;
  //       tempList.push(l);
  //     });
  //     list = tempList;
  //     // this._action.syncData(list);
  //   }
  // }

  // drop(event: any) {
  //   let previous, current;
  //   const list = this.getList();
  //   if (event.previousContainer === event.container) {
  //     current = list.indexOf(event.container.data);
  //     moveItemInArray(list[current].data, event.previousIndex, event.currentIndex);
  //   } else {
  //     previous = list.indexOf(event.previousContainer.data);
  //     current = list.indexOf(event.container.data);
  //     transferArrayItem(list[previous].data, list[current].data, event.previousIndex, event.currentIndex);
  //   }
  //   // switch (this.setting.SORT_MODE) {
  //   //   case SortModeEnum.BY_CREATED: {
  //   //     this.sortByTime(current)
  //   //     break;
  //   //   }
  //   //   case SortModeEnum.FREE_FALL:
  //   //   default: {
  //   //     break;
  //   //   }
  //   // }
  //   // this._action.syncData(list);
  // }

  // sortByTime(current: number) {
  //   const list = this.getList();
  //   list[current].data.sort((a, b) => b.created - a.created);
  // }

  // // HELPER FUNCTIONS

  private _getId() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  // getList(): Array<BoardModel> {
  //   return []
  // }

  private getTimeStamp(): number {
    return Date.now();
  }

  newItem(data: BoardModel) {
    this.notify.next(data);
  }

  getNotificationInstance() {
    return this.notify;
  }

}
