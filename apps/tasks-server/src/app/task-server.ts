import * as express from "express";
import * as cors from "cors";
import * as http from "http";
import * as SocketIO from 'socket.io';
import * as fs from 'fs';
// import { TaskModel } from "@libs/shared";

export class TaskServer {
    public static readonly PORT: number = 3333;
    private app: express.Application;
    private server: http.Server;
    private io: SocketIO.Server;
    private port: string | number;
    private file = 'task-data.json';

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
        this.io = require("socket.io")(this.server, {
            cors: {
                origin: '*'
            }
        }).listen(this.server, { origins: '*:*' });
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log("Running server on port", this.port);
        });

        this.io.on('connection', (socket) => {
            console.log('welcome', socket.id);
            socket.emit('fireInTheHole', this.readDataFromFile());
            socket.on('fireInTheHole', () => {
                console.log('fireInTheHole event triggered')
            });
            socket.on('makeFireInTheHole', (data) => {
                this.writeDataToFile(data);
                socket.broadcast.emit('fireInTheHole', this.readDataFromFile());
            });
            socket.on('disconnect', () => {
                console.log('disconnected from server')
            });
        });
    }

    private writeDataToFile(dataStore) {
        const data = JSON.stringify(dataStore);
        if (data && data.length) {
            fs.writeFileSync(this.file, data);
        }
    }

    private readDataFromFile() {
        if (!fs.existsSync(this.file)) {
            this.writeDataToFile(null);
        }
        const rawData = fs.readFileSync(this.file);
        return JSON.parse(rawData.toString());
    }

    public getApp(): express.Application {
        return this.app;
    }
}