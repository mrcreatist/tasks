import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { io } from 'socket.io-client';
import { BoardModel } from '@libs/shared';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: any;

  // eslint-disable-next-line @typescript-eslint/ban-types
  initializeSocket(success: Function) {
    this.socket = io(`${environment.socket.URL}`);
    this.socket.on('fireInTheHole', (res: Array<BoardModel>) => success(res));
  }

  sendData(data: Array<BoardModel>) {
    this.socket.emit('makeFireInTheHole', data);
  }

}
