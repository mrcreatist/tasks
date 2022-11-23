import { BoardModel, SocketBoardPayload, SocketItemPayload, SOCKET_EVENT } from "@libs/shared";
import { SocketAction } from "../controller";

export class SocketRoute {
  establish(socket) {
    const socketAction = new SocketAction();
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
  }
}
