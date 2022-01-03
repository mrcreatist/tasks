/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { BoardModel, SettingsModel, SortModeEnum, StorageModeEnum } from '@libs/shared';

@Injectable()
export class ActionService {

    data: Array<BoardModel>;

    constructor (
        private _socket: SocketService
    ) { }

    // TEMPLATE

    storageTemplate(settings: SettingsModel, localStorageFn: Function, socketFn: Function) {
        switch (settings.STORAGE_MODE) {
            case StorageModeEnum.SOCKET: {
                socketFn();
                break;
            }
            case StorageModeEnum.LOCAL_STORAGE:
            default: {
                localStorageFn();
                break;
            }
        }
    }

    sortTemplate(settings: SettingsModel, freeFall: Function, createdBy: Function) {
        switch (settings.SORT_MODE) {
            case SortModeEnum.BY_CREATED: {
                createdBy();
                break;
            }
            case SortModeEnum.FREE_FALL:
            default: {
                freeFall();
                break;
            }
        }
    }

    // APPLY SETTINGS

    applyStorageMode(settings: SettingsModel) {
        this.storageTemplate(
            settings,
            () => (this._socket.close(), setTimeout(() => this.data = [])),
            () => this._socket.initializeSocket((data: Array<BoardModel>) => this.data = data)
        );
    }

    applySortMode(settings: SettingsModel) {
        this.sortTemplate(settings, () => null, () => null);
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

    readLocalTasks() {
        const data = localStorage.getItem('data');
        return data ? <Array<BoardModel>>JSON.parse(data) : [];
    }

    // DATA OPS

    getData() {
        return this.data;
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
