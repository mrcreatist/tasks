import { Injectable } from '@angular/core';
import { SettingKeysEnum, SettingsModel, SortModeEnum, StorageModeEnum } from '@libs/shared'

@Injectable()
export class SettingsService {

    settings: SettingsModel;
    localKey = 'config';

    initSettings() {
        this.settings = new SettingsModel();
        this.writeLocal();
    }

    getSettings() {
        if (!this.settings) {
            this.initSettings();
        }
        return this.settings;
    }

    setSettings(newSettings: SettingsModel) {
        this.settings = newSettings;
        return this.settings;
    }

    resetSettings() {
        this.initSettings();
        return this.settings;
    }

    getTypeEnum(type: string) {
        switch (type) {
            case SettingKeysEnum.SORT_MODE: return SortModeEnum
            case SettingKeysEnum.STORAGE_MODE: return StorageModeEnum
            default: return null
        }
    }

    setup() {
        if (!this.readLocal()) {
            this.initSettings();
        } else {
            this.settings = this.readLocal();
        }
    }

    readLocal() {
        const data = localStorage.getItem(this.localKey);
        return data ? <SettingsModel>JSON.parse(data) : new SettingsModel();
    }

    writeLocal() {
        localStorage.setItem(this.localKey, JSON.stringify(this.settings));
    }

}
