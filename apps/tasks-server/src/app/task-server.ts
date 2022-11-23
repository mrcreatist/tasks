import * as express from "express";
import * as cors from "cors";
import * as http from "http";
import * as SocketIO from 'socket.io';
import { BoardModel, SocketBoardPayload, SocketItemPayload, SOCKET_EVENT } from "@libs/shared";
import { FILE, SocketAction } from "./controller";

export class TaskServer {
  public static readonly PORT: number = 3333;
  private app: express.Application;
  private server: http.Server;
  private io: SocketIO.Server;
  private port: string | number;

  constructor () {
    this.createApp();
    this.config();
    this.createServer();
    this.sockets();
    this.listen();
  }

  private createApp(): void {
    this.app = express();
    this.app.use(cors());
  }

  private createServer(): void {
    this.server = http.createServer(this.app);
  }

  private config(): void {
    this.port = process.env.PORT || TaskServer.PORT;
  }

  private sockets(): void {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    this.io = require("socket.io")(this.server, { cors: { origin: '*' } }).listen(this.server, { origins: '*:*' });
  }

  private socketListener() {
    this.io.on('connection', (socket) => {
      // socketAction Instance
      const socketAction = new SocketAction();

      // notify about new user
      console.log('new connection', socket.id);

      // initial file read
      socket.emit(SOCKET_EVENT.SYNC, FILE.read());

      socket.on(SOCKET_EVENT.CREATE_BOARD, (data: SocketBoardPayload) => socketAction[SOCKET_EVENT.CREATE_BOARD](socket, data));
      socket.on(SOCKET_EVENT.UPDATE_BOARD, (data: SocketBoardPayload) => socketAction[SOCKET_EVENT.UPDATE_BOARD](socket, data));
      socket.on(SOCKET_EVENT.DELETE_BOARD, (data: SocketBoardPayload) => socketAction[SOCKET_EVENT.DELETE_BOARD](socket, data));
      socket.on(SOCKET_EVENT.CREATE_TASK, (data: SocketItemPayload) => socketAction[SOCKET_EVENT.CREATE_TASK](socket, data));
      socket.on(SOCKET_EVENT.UPDATE_TASK, (data: SocketItemPayload) => socketAction[SOCKET_EVENT.UPDATE_TASK](socket, data));
      socket.on(SOCKET_EVENT.DELETE_TASK, (data: SocketItemPayload) => socketAction[SOCKET_EVENT.DELETE_TASK](socket, data));
      socket.on(SOCKET_EVENT.MARK_TOGGLE, (data: SocketItemPayload) => socketAction[SOCKET_EVENT.MARK_TOGGLE](socket, data));
      socket.on(SOCKET_EVENT.SYNC, (data: Array<BoardModel>) => socketAction[SOCKET_EVENT.SYNC](socket, data));
      socket.on(SOCKET_EVENT.DISCONNECT, () => socketAction.disconnect());
      socket.onAny((event, ...args) => console.log(event, args))
    });
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log("Running server on port", this.port);
    });
    this.socketListener();
  }

  public getApp(): express.Application {
    return this.app;
  }
}
