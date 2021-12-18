import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CONFIGURATION, SortModeEnum, StorageModeEnum } from '@libs/shared';
import { ConfigurationService } from '../../service';

class settingDetail {
  name: string;
  parameter: object;
}

@Component({
  selector: 'tasks-ui-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settings: any;
  queue: Array<settingDetail> = [];

  constructor (
    private dialogRef: MatDialogRef<SettingsComponent>,
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
    const configKeys = Object.keys(CONFIGURATION);
    switch (settingKey) {
      case configKeys[0]: {
        return StorageModeEnum;
      }
      case configKeys[1]: {
        return SortModeEnum;
      }
      default: {
        return StorageModeEnum;
      }
    }
  }

  // SETTING DROP-DOWNS

  getEnumKeys(enumObj: object): Array<string> {
    return Object.keys(enumObj)
  }

  // PROCESS FUNCTIONS

  updateSetting(name: string, param: any) {
    this.settings[name] = param?.value;
  }

  processQueue(setting: string) {
    // switch (setting) {
    //   case 'STORAGE_MODE': {
    //     this.setStorageMode(this.settings[setting]);
    //     break;
    //   }
    //   case 'SORT_MODE': {
    //     this.setSortMode(this.settings[setting]);
    //     break;
    //   }
    // }
  }

  // MAIN IMPLEMENTERS

  setSortMode(value: string) {
    // this._main.setSortMode(SortModeEnum[value]);
  }

  setStorageMode(value: string) {
    // this._main.setStorageMode(StorageModeEnum[value]);
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
    const defaultConfig = this._config.getConfigurationConstant();
    // Object.keys(defaultConfig).forEach(element => this.settings[element] = defaultConfig[element]);
    // this._main.setSortMode(SortModeEnum[this.settings['SORT_MODE']]);
    // this._main.setStorageMode(StorageModeEnum[this.settings['STORAGE_MODE']]);
    this._config.saveConfiguration(this.settings);
    this.dialogRef.close('Reset Successful! 🥳');
  }

}
