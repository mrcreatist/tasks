import { SortModeEnum, StorageModeEnum, SettingKeysEnum } from "../enum";

export class SettingsModel {
    [SettingKeysEnum.SORT_MODE]: SortModeEnum;
    [SettingKeysEnum.STORAGE_MODE]: StorageModeEnum;

    constructor () {
        this.STORAGE_MODE = StorageModeEnum.LOCAL_STORAGE;
        this.SORT_MODE = SortModeEnum.FREE_FALL;
    }
}