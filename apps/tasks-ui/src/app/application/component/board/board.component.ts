import { Component, OnInit } from '@angular/core';
import { BoardModel, SOCKET_EVENT } from '@libs/shared';
import { TaskService } from '../../service';
import { io } from 'socket.io-client';
import { environment } from '../../../../environments/environment';

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
    this.socket.on(SOCKET_EVENT.READ, (data: any) => console.log(data));
  }

  subscribeNotification() {
    this.task.getNotificationInstance().subscribe(item => {
      if (item) {
        this.socket.emit(SOCKET_EVENT.CREATE, item);
      }
    });
  }
}
