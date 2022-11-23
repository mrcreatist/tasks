export interface BoardModel {
  id: number;
  name: string;
  created: number;
  data: Array<ItemModel>;
}

export interface ItemDataModel {
  title?: string;
  description?: string;
}

export interface ItemModel extends ItemDataModel {
  id: number;
  created: number;
  completed: boolean;
}

export interface SocketBoardPayload {
  id: number;
  name?: string;
}

export interface SocketItemPayload extends ItemDataModel {
  id?: number;
  boardId: number,
}
