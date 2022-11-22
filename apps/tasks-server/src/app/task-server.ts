import * as express from "express";
import * as cors from "cors";
import * as http from "http";
import * as SocketIO from 'socket.io';
import { SOCKET_EVENT } from "@libs/shared";
import { FILE, SOCKET_ACTION } from "./controller";

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
    // SOCKET_ROUTE.establish();

    this.io.on('connection', (socket) => {
      console.log('new connection', socket.id);

      // initial file read
      socket.emit(SOCKET_EVENT.READ, FILE.read());

      // create
      socket.on(SOCKET_EVENT.CREATE, (data) => {
        SOCKET_ACTION[SOCKET_EVENT.CREATE](data);
        socket.emit(SOCKET_EVENT.READ, FILE.read());
      });

      //read
      socket.on(SOCKET_EVENT.READ, () => {
        console.log('caught event');
      });

      // update
      socket.on(SOCKET_EVENT.UPDATE, (data) => {
        SOCKET_ACTION[SOCKET_EVENT.UPDATE](data);
        socket.broadcast.emit(SOCKET_EVENT.READ, FILE.read());
      });

      // delete
      socket.on(SOCKET_EVENT.DELETE, (data) => {
        socket.broadcast.emit(SOCKET_EVENT.DELETE, data)
      });

      // disconnect
      socket.on(SOCKET_EVENT.DISCONNECT, () => {
        SOCKET_ACTION.disconnect()
      });

      // logger
      socket.onAny((event, ...args) => {
        console.log(event, args);
      })
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
