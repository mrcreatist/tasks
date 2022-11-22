import { Injectable } from '@angular/core';
import { SettingKeysEnum, SettingsModel, SortModeEnum, StorageModeEnum } from '@libs/shared'

@Injectable()
export class SettingsService {

  // settings: SettingsModel;
  // localKey = 'config';

  // constructor (
  //   private _action: ActionService
  // ) { }

  // initSettings() {
  //   this.settings = new SettingsModel();
  //   this._action.writeLocalSetting(this.settings);
  // }

  // getSettings() {
  //   if (!this.settings) {
  //     this.initSettings();
  //   }
  //   return this.settings;
  // }

  // setSettings(newSettings: SettingsModel) {
  //   this.settings = newSettings;
  //   this._action.writeLocalSetting(this.settings);
  //   this.applySetting();
  // }

  // resetSettings() {
  //   this.initSettings();
  // }

  // getTypeEnum(type: string) {
  //   switch (type) {
  //     case SettingKeysEnum.SORT_MODE: return SortModeEnum
  //     case SettingKeysEnum.STORAGE_MODE: return StorageModeEnum
  //     default: return null
  //   }
  // }

  // establish() {
  //   const local = this._action.readLocalSetting();
  //   if (!local) {
  //     this.initSettings();
  //   } else {
  //     this.settings = local;
  //   }
  //   this.applySetting();
  // }

  // // APPLY SETTING SECTION

  // applySetting() {
  //   this._action.applyStorageMode(this.settings);
  //   this._action.applySortMode(this.settings);
  // }

}
