import { Component, OnInit } from '@angular/core';
import { BoardModel, SOCKET_EVENT } from '@libs/shared';
import { TaskService } from '../../service';
import { io } from 'socket.io-client';
import { environment } from '../../../../environments/environment';
import { NotificationModel } from '../../model';

@Component({
  selector: 'tasks-ui-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  socket: any;
  lists: Array<BoardModel> = [];

  constructor (
    private task: TaskService
  ) { }

  ngOnInit(): void {
    this.initializeSocket();
    this.attachListener();
    this.subscribeNotification();
  }

  initializeSocket() {
    this.socket = io(environment.socket.URL);
  }

  attachListener() {
    this.socket.on(SOCKET_EVENT.SYNC, (data: Array<BoardModel>) => this.task.write(data));
  }

  subscribeNotification() {
    this.task.listenNotification().subscribe((notification: NotificationModel<any>) => {
      if (notification.data) {
        if (notification.action === null) {
          this.lists = <Array<BoardModel>>notification.data;
        } else {
          this.socket.emit(notification.action, notification.data);
        }
      }
    });
  }
}
