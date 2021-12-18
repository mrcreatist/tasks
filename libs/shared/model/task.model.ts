export class BoardModel {
    id: number;
    name: string;
    created: number;
    data: Array<ItemModel>;
}

export class ItemDataModel {
    title: string;
    description: string;
}

export class ItemModel extends ItemDataModel {
    id: number;
    created: number;
    completed: boolean;
}