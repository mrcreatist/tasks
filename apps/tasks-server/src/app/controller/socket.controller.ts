import { FILE } from "./file.controller";
import { BoardModel, SOCKET_EVENT } from '@libs/shared'

export const SOCKET_ACTION = {
  [SOCKET_EVENT.DISCONNECT]: () => {
    console.log('Disconnected from the server');
  },
  [SOCKET_EVENT.CREATE]: (data) => {
    const fileData: Array<BoardModel> = FILE.read();
    fileData.push(data);
    FILE.write(fileData);
    console.log(fileData);
  },
  [SOCKET_EVENT.UPDATE]: (data: BoardModel) => {
    const fileData: Array<BoardModel> = FILE.read();
    const index = fileData.findIndex((item: BoardModel) => item.id === data.id)
    index > -1 ? fileData[index] = data : null;
    FILE.write(fileData);
  },
  [SOCKET_EVENT.READ]: () => {
    console.log(`${SOCKET_EVENT.READ} event triggered`)
  }
}
