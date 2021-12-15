import { Injectable } from '@angular/core';
import { CONFIGURATION } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  settings: any;
  localKey = 'config'

  constructor () {
    this.settings = this.readFromLocalStorage() || CONFIGURATION;
  }

  setInLocalStorage(data) {
    localStorage.setItem(this.localKey, JSON.stringify(data));
  }

  readFromLocalStorage() {
    return JSON.parse(localStorage.getItem(this.localKey))
  }

  getConfiguration(): Array<string> {
    return this.settings;
  }

  getConfigurationConstant() {
    return CONFIGURATION;
  }

  saveConfiguration(setting) {
    this.setInLocalStorage(setting);
  }

  isAvailable() {
    return this.readFromLocalStorage() ? true : false;
  }

  setup() {
    this.setInLocalStorage(this.settings);
  }

}
