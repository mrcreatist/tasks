import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { io } from 'socket.io-client';
import { BoardModel, SOCKET_EVENT } from '@libs/shared';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private socket: any;

  // eslint-disable-next-line @typescript-eslint/ban-types
  initializeSocket(callback: Function) {
    this.socket = io(`${environment.socket.URL}`);
    this.socket.on(SOCKET_EVENT.fireInTheHole, (res: Array<BoardModel>) => callback(res));
  }

  sendData(data: Array<BoardModel>) {
    this.socket.emit(SOCKET_EVENT.makeFireInTheHole, data);
  }

}
