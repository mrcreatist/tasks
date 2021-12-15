import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { CONFIGURATION } from 'src/app/constant';
import { SortModeEnum, StorageModeEnum } from 'src/app/enum';
import { ConfigurationService, MainService } from 'src/app/service';

class settingDetail {
  name: string;
  parameter: any;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  queue: Array<settingDetail> = [];
  settings: any;

  constructor (
    private dialogRef: MatDialogRef<SettingsComponent>,
    private _main: MainService,
    private _config: ConfigurationService
  ) { }

  ngOnInit() {
    this._getSettings();
  }

  private _getSettings() {
    this.settings = this._config.getConfiguration();
  }

  getSettingHeading(name: string) {
    return name.toLowerCase().replace('_', ' ');
  }

  getSettingKey() {
    return Object.keys(this.settings);
  }

  getParentEnum(settingKey: string) {
    let configKeys = Object.keys(CONFIGURATION);
    switch (settingKey) {
      case configKeys[0]: {
        return StorageModeEnum;
      }
      case configKeys[1]: {
        return SortModeEnum;
      }
    }
  }

  // SETTING DROP-DOWNS

  getEnumKeys(enumObj): Array<string> {
    return Object.keys(enumObj)
  }

  // PROCESS FUNCTIONS

  updateSetting(name: string, param: any) {
    this.settings[name] = param?.value;
  }

  processQueue(setting: string) {
    switch (setting) {
      case 'STORAGE_MODE': {
        this.setStorageMode(this.settings[setting]);
        break;
      }
      case 'SORT_MODE': {
        this.setSortMode(this.settings[setting]);
        break;
      }
    }
  }

  // MAIN IMPLEMENTERS

  setSortMode(value) {
    this._main.setSortMode(SortModeEnum[value]);
  }

  setStorageMode(value) {
    this._main.setStorageMode(StorageModeEnum[value]);
  }

  // DIALOG ACTIONS

  closeDialog() {
    this.dialogRef.close();
  }

  submit() {
    this.getSettingKey().forEach(q => this.processQueue(q));
    this._config.saveConfiguration(this.settings);
    this.dialogRef.close('Settings Saved! 🎉');
  }

  reset() {
    let defaultConfig = this._config.getConfigurationConstant();
    Object.keys(defaultConfig).forEach(element => this.settings[element] = defaultConfig[element]);
    this._main.setSortMode(SortModeEnum[this.settings['SORT_MODE']]);
    this._main.setStorageMode(StorageModeEnum[this.settings['STORAGE_MODE']]);
    this._config.saveConfiguration(this.settings);
    this.dialogRef.close('Reset Successful! 🥳');
  }

}
