import { FILE } from "./file.controller";
import { BoardModel, ItemModel, SocketBoardPayload, SocketItemPayload, SOCKET_EVENT } from '@libs/shared'

export class SocketAction {
  [SOCKET_EVENT.DISCONNECT]() {
    console.log('Disconnected from the server');
  }

  // BOARD

  [SOCKET_EVENT.CREATE_BOARD](socket, data: SocketBoardPayload) {
    const section: BoardModel = this.boardObject(data);
    this.dataSnapshot((fileData: Array<BoardModel>) => fileData.push(section));
    this.echo(socket);
  }

  [SOCKET_EVENT.UPDATE_BOARD](socket, data: SocketBoardPayload) {
    this.dataSnapshot((fileData: Array<BoardModel>) => this.hunt(fileData, 'id', data.id, (board: BoardModel) => board.name = data.name))
    this.echo(socket)
  }

  [SOCKET_EVENT.DELETE_BOARD](socket, data: SocketBoardPayload) {
    this.dataSnapshot((fileData: Array<BoardModel>) => this.hunt(fileData, 'id', data.id, (board) => fileData.splice(this.findGlobalIndex(board.id), 1)));
    this.echo(socket);
  }

  // TASK

  [SOCKET_EVENT.CREATE_TASK](socket, data: SocketItemPayload) {
    const task: ItemModel = this.itemObject(data);
    this.dataSnapshot((fileData: Array<BoardModel>) => this.hunt(fileData, 'id', data.boardId, (board) => board.data.push(task)));
    this.echo(socket);
  }

  [SOCKET_EVENT.UPDATE_TASK](socket, data: SocketItemPayload) {
    this.dataSnapshot((fileData: Array<BoardModel>) => this.hunt(fileData, 'id', data.boardId, (board) => {
      this.hunt(board.data, 'id', data.id, (task) => {
        task.title = data.title;
        task.description = data.description;
      })
    }));
    this.echo(socket);
  }

  [SOCKET_EVENT.DELETE_TASK](socket, data: SocketItemPayload) {
    this.dataSnapshot((fileData: Array<BoardModel>) =>
      this.hunt(fileData, 'id', data.boardId, (board) =>
        this.hunt(board.data, 'id', data.id, (task) =>
          board.data.splice(this.findGlobalIndex(task.id), 1)
        )));
    this.echo(socket);
  }

  // MARK TOGGLE

  [SOCKET_EVENT.MARK_TOGGLE](socket, data: SocketItemPayload) {
    this.dataSnapshot((fileData: Array<BoardModel>) => {
      const board = fileData.find((item: BoardModel) => item.id === data.boardId);
      if (board) {
        const task = board.data.find(task => task.id === data.id);
        if (task) task.completed = !task.completed;
      }
    });
    this.echo(socket);
  }

  // SYNC

  [SOCKET_EVENT.SYNC](socket, data: Array<BoardModel>) {
    FILE.write(data ?? []);
    this.echo(socket);
  }

  // FINAL ACTION

  echo(socket) {
    socket.emit(SOCKET_EVENT.SYNC, FILE.read());
    socket.broadcast.emit(SOCKET_EVENT.SYNC, FILE.read());
  }

  // HELPER FUNCTION

  private getId() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  private getTimeStamp(): number {
    return Date.now();
  }

  private hunt(source, key, identifier, callback: (params) => void) {
    const item = source.find((item: BoardModel) => item[key] === identifier);
    if (item) callback(item);
  }

  private dataSnapshot(callback: (params) => void) {
    const fileData: Array<BoardModel> = FILE.read();
    callback(fileData);
    FILE.write(fileData);
  }

  private findGlobalIndex(itemId) {
    const fileData = FILE.read();
    let index = -1;
    const boardIndex = fileData.findIndex(board => board.id === itemId);
    if (boardIndex > -1) {
      index = boardIndex;
    } else {
      fileData.forEach(element => {
        const task = element.data.findIndex(e => e.id === itemId)
        if (task > -1) {
          index = task;
        }
      });
    }
    return index
  }

  private boardObject(data: SocketBoardPayload): BoardModel {
    return <BoardModel>{
      id: this.getId(),
      name: data.name,
      data: [],
      created: this.getTimeStamp()
    }
  }

  private itemObject(data: SocketItemPayload) {
    return <ItemModel>{
      id: this.getId(),
      title: data.title,
      description: data.description,
      completed: false,
      created: this.getTimeStamp()
    }
  }
}
