import * as express from "express";
import * as cors from "cors";
import * as http from "http";
import * as SocketIO from 'socket.io';
import { SOCKET_EVENT } from "@libs/shared";
import { FILE } from "./controller";
import { SocketRoute } from "./route";

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
      console.log('new connection', socket.id);
      socket.emit(SOCKET_EVENT.SYNC, FILE.read());
      const route = new SocketRoute();
      route.establish(socket);
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
