import { FILE } from "./file.controller";
import { BoardModel, ItemModel, SocketBoardPayload, SocketItemPayload, SOCKET_EVENT } from '@libs/shared'

export class SocketAction {
  [SOCKET_EVENT.DISCONNECT]() {
    console.log('Disconnected from the server');
  }

  // BOARD

  [SOCKET_EVENT.CREATE_BOARD](socket, data: SocketBoardPayload) {
    const section: BoardModel = {
      id: this.getId(),
      name: data.name,
      data: [],
      created: this.getTimeStamp()
    };
    const fileData: Array<BoardModel> = FILE.read();
    fileData.push(section);
    FILE.write(fileData);
    this.echo(socket);
  }

  [SOCKET_EVENT.UPDATE_BOARD](socket, data: SocketBoardPayload) {
    const fileData: Array<BoardModel> = FILE.read();
    const index = fileData.findIndex((item: BoardModel) => item.id === data.id)
    index > -1 ? fileData[index].name = data.name : null;
    FILE.write(fileData);
    this.echo(socket)
  }

  [SOCKET_EVENT.DELETE_BOARD](socket, data: SocketBoardPayload) {
    const fileData: Array<BoardModel> = FILE.read();
    const index = fileData.findIndex((item: BoardModel) => item.id === data.id)
    fileData.splice(index, 1);
    FILE.write(fileData);
    this.echo(socket);
  }

  // TASK

  [SOCKET_EVENT.CREATE_TASK](socket, data: SocketItemPayload) {
    const task: ItemModel = {
      id: this.getId(),
      title: data.title,
      description: data.description,
      completed: false,
      created: this.getTimeStamp()
    };
    const fileData: Array<BoardModel> = FILE.read();
    const index = fileData.findIndex((item: BoardModel) => item.id === data.boardId);
    index > -1 ? fileData[index].data.push(task) : null;
    FILE.write(fileData);
    this.echo(socket);
  }

  [SOCKET_EVENT.UPDATE_TASK](socket, data: SocketItemPayload) {
    const fileData: Array<BoardModel> = FILE.read();
    const boardIndex = fileData.findIndex((item: BoardModel) => item.id === data.boardId);
    if (boardIndex > -1) {
      const board = fileData[boardIndex];
      const task = board.data.find(task => task.id === data.id);
      if (task) {
        task.title = data.title;
        task.description = data.description;
      }
    }
    FILE.write(fileData);
    this.echo(socket)
  }

  [SOCKET_EVENT.DELETE_TASK](socket, data: SocketItemPayload) {
    const fileData: Array<BoardModel> = FILE.read();
    const boardIndex = fileData.findIndex((item: BoardModel) => item.id === data.boardId);
    if (boardIndex > -1) {
      const board = fileData[boardIndex];
      const taskIndex = board.data.findIndex(task => task.id === data.id)
      taskIndex > -1 ? board.data.splice(taskIndex, 1) : null;
    }
    FILE.write(fileData);
    this.echo(socket);
  }

  // MARK TOGGLE

  [SOCKET_EVENT.MARK_TOGGLE](socket, data: SocketItemPayload) {
    const fileData: Array<BoardModel> = FILE.read();
    const board = fileData.find((item: BoardModel) => item.id === data.boardId);
    if (board) {
      const task = board.data.find(task => task.id === data.id);
      if (task) task.completed = !task.completed;
    }
    FILE.write(fileData);
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
}
