import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { BoardModel, SettingsModel, SortModeEnum, StorageModeEnum } from '@libs/shared';

@Injectable()
export class ActionService {

    constructor (
        private _socket: SocketService
    ) { }

    // APPLY SETTINGS

    // eslint-disable-next-line @typescript-eslint/ban-types
    applyStorageMode(settings: SettingsModel, callback: Function) {
        switch (settings.STORAGE_MODE) {
            case StorageModeEnum.LOCAL_STORAGE: {
                this._socket.initializeSocket((data: Array<BoardModel>) => callback(data));
                break;
            }
            case StorageModeEnum.SOCKET:
            default: {
                setTimeout(() => callback([]))
                break;
            }
        }
    }

    applySortMode(settings: SettingsModel) {
        switch (settings.SORT_MODE) {
            case SortModeEnum.BY_CREATED: {
                break;
            }
            case SortModeEnum.FREE_FALL:
            default: {
                break;
            }
        }
    }

    // LOCAL STORAGE OPS

    readLocalSetting() {
        const data = localStorage.getItem('config');
        return data ? <SettingsModel>JSON.parse(data) : new SettingsModel();
    }

    writeLocalSetting(settings: SettingsModel) {
        localStorage.setItem('config', JSON.stringify(settings));
    }

    writeLocalTasks(data: Array<BoardModel>) {
        localStorage.setItem('data', JSON.stringify(data));
    }

    // SOCKET

    // eslint-disable-next-line @typescript-eslint/ban-types
    syncData(setting: SettingsModel, lists: Array<BoardModel>, callback: Function) {
        if (lists) {
            switch (setting.STORAGE_MODE) {
                case StorageModeEnum.SOCKET:
                    this._socket.sendData(lists);
                    break;
                case StorageModeEnum.LOCAL_STORAGE:
                default:
                    this.writeLocalTasks(lists)
                    callback(lists);
                    break;
            }
        }
    }

}
