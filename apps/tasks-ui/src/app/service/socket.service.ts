import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as socketIO from 'socket.io-client';
import { BoardModel } from '../model';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: any;

  constructor () { }

  initializeSocket(success: Function) {
    this.socket = socketIO(`${environment.socket.URL}`);
    this.socket.on('fireInTheHole', (res: Array<BoardModel>) => success(res));
  }

  sendData(data: Array<BoardModel>) {
    this.socket.emit('makeFireInTheHole', data);
  }

}
