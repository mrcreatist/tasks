import { Injectable } from '@angular/core';
import { ItemModel, BoardModel, ItemDataModel, SOCKET_EVENT, SocketBoardPayload, SocketItemPayload } from '@libs/shared';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BehaviorSubject } from 'rxjs';
import { NotificationModel } from '../model';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  notify = new BehaviorSubject<NotificationModel<null>>({
    action: null,
    data: null
  });

  private dataKey = 'data';

  section = {
    create: (name: string) => {
      this.newItem(<NotificationModel<SocketBoardPayload>>{
        action: SOCKET_EVENT.CREATE_BOARD,
        data: {
          id: NaN,
          name: name
        }
      });
    },
    update: (sectionId: number, name: string) => {
      this.newItem(<NotificationModel<SocketBoardPayload>>{
        action: SOCKET_EVENT.UPDATE_BOARD,
        data: {
          id: sectionId,
          name: name
        }
      });
    },
    delete: (section: BoardModel) => {
      this.newItem(<NotificationModel<SocketBoardPayload>>{
        action: SOCKET_EVENT.DELETE_BOARD,
        data: {
          id: section.id
        }
      })
    },
  }

  item = {
    create: (boardId: number, title: string, description: string) => {
      this.newItem(<NotificationModel<SocketItemPayload>>{
        action: SOCKET_EVENT.CREATE_TASK,
        data: { boardId, title, description }
      })

      // if (this.setting.SORT_MODE === SortModeEnum.BY_CREATED) {
      //   const element = list.find((e: BoardModel) => e.id === id);
      //   if (element) {
      //     const current = list.indexOf(element);
      //     this.sortByTime(current);
      //   }
      // }
    },
    update: (boardId: number, taskId: number, task: ItemDataModel) => {
      this.newItem(<NotificationModel<SocketItemPayload>>{
        action: SOCKET_EVENT.UPDATE_TASK,
        data: {
          boardId,
          id: taskId,
          ...task
        }
      })
    },
    delete: (boardId: number, taskId: number) => {
      this.newItem(<NotificationModel<SocketItemPayload>>{
        action: SOCKET_EVENT.DELETE_TASK,
        data: {
          boardId,
          id: taskId
        }
      })
    },
    markToggle: (boardId: number, taskId: number) => {
      this.newItem(<NotificationModel<SocketItemPayload>>{
        action: SOCKET_EVENT.MARK_TOGGLE,
        data: {
          boardId: boardId,
          id: taskId
        }
      })
    },
  }

  drop(event: CdkDragDrop<BoardModel>) {
    const boards = this.read();
    const previous = boards.findIndex((board: BoardModel) => board.id === event.previousContainer.data.id);
    const current = boards.findIndex((board: BoardModel) => board.id === event.container.data.id);
    if (event.previousContainer === event.container) {
      moveItemInArray(boards[current].data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(boards[previous].data, boards[current].data, event.previousIndex, event.currentIndex);
    }
    this.newItem({
      action: SOCKET_EVENT.SYNC,
      data: boards
    });
  }

  sortByTime(current: number) {
    // const list = this.read();
    // list[current].data.sort((a, b) => b.created - a.created);
  }

  // getList(): Array<BoardModel> {
  //   return []
  // }

  newItem(notification: NotificationModel<any>) {
    this.notify.next(notification);
  }

  listenNotification() {
    return this.notify;
  }

  write(data: Array<BoardModel>) {
    localStorage.setItem(this.dataKey, JSON.stringify(data) ?? null);
    this.newItem({
      action: null,
      data: this.read()
    });
  }

  read() {
    const data = localStorage.getItem(this.dataKey);
    return data ? JSON.parse(data) : []
  }

}
