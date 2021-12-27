import { Injectable } from '@angular/core';
import { SettingKeysEnum, SettingsModel, SortModeEnum, StorageModeEnum } from '@libs/shared'

@Injectable()
export class SettingsService {

    settings: SettingsModel;

    constructor () {
        this.settings = new SettingsModel();
    }

    getDefaultSettings() {
        return new SettingsModel();
    }

    setSettings(newSettings: SettingsModel) {
        this.settings = newSettings;
    }

    getCurrentSettings() {
        return this.settings;
    }

    resetSettings() {
        this.setSettings(new SettingsModel());
    }

    getTypeEnum(type: string) {
        switch (type) {
            case SettingKeysEnum.SORT_MODE: return SortModeEnum
            case SettingKeysEnum.STORAGE_MODE: return StorageModeEnum
            default: return null
        }
    }

}
