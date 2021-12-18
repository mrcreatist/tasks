import { Injectable } from '@angular/core';
import { CONFIGURATION, SettingsModel } from '@libs/shared';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  settings: SettingsModel;
  localKey = 'config';

  constructor () {
    this.settings = this.readFromLocalStorage() ?? CONFIGURATION;
  }

  setInLocalStorage(data: SettingsModel) {
    localStorage.setItem(this.localKey, JSON.stringify(data));
  }

  readFromLocalStorage() {
    const config = localStorage.getItem(this.localKey);
    return config ? JSON.parse(config) : null;
  }

  getConfiguration(): SettingsModel {
    return this.settings;
  }

  getConfigurationConstant() {
    return CONFIGURATION;
  }

  saveConfiguration(setting: SettingsModel) {
    this.setInLocalStorage(setting);
  }

  isConfigAvailable(): boolean {
    return this.readFromLocalStorage();
  }

  setup() {
    this.setInLocalStorage(this.settings);
  }

}
