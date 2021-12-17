import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { io } from 'socket.io-client';
import { BoardModel } from '../model';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: any;

  initializeSocket(success: Function) {
    this.socket = io(`${environment.socket.URL}`);
    this.socket.on('fireInTheHole', (res: Array<BoardModel>) => {
      console.log('initialized connection socket')
      success(res)
    });
  }

  sendData(data: Array<BoardModel>) {
    this.socket.emit('makeFireInTheHole', data);
  }

}
