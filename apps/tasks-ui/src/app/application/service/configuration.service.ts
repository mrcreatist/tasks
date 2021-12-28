import { Injectable } from '@angular/core';
import { SettingsModel } from '@libs/shared';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  settings: SettingsModel;
  localKey = 'config';

  constructor (
    // private _setting: SettingsService
  ) {
    // if (!this.isConfigAvailable()) {
    //   this.settings = this._setting.getDefaultSettings();
    // }
  }

  // setInLocalStorage(data: SettingsModel) {
  //   localStorage.setItem(this.localKey, JSON.stringify(data));
  // }

  // readFromLocalStorage() {
  //   const config = localStorage.getItem(this.localKey);
  //   return config ? JSON.parse(config) : null;
  // }

  // getConfiguration(): SettingsModel {
  //   return this.settings;
  // }

  // saveConfiguration(setting: SettingsModel) {
  //   this.setInLocalStorage(setting);
  // }

  // isConfigAvailable(): boolean {
  //   return this.readFromLocalStorage();
  // }

  // setup() {
  //   this.setInLocalStorage(this.settings);
  // }

}
