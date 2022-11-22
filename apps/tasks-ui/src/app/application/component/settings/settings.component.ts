import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { SettingsModel } from '@libs/shared';
import { SettingsService } from '../../service';

@Component({
  selector: 'tasks-ui-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  settings: SettingsModel;

  constructor (
    private dialogRef: MatDialogRef<SettingsComponent>,
    private _settings: SettingsService
  ) { }

  ngOnInit() {
    // this._initializeSettings();
  }

  // private _initializeSettings() {
  //   this.settings = this._settings.getSettings();
  // }

  // toNormalText(item: string) {
  //   return item.toLowerCase().replace('_', ' ');
  // }

  // getSettingValue(set: keyof SettingsModel) {
  //   return this.settings[set].toString();
  // }

  // getSettingKey() {
  //   return Object.keys(this.settings);
  // }

  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // getEnum(settingKey: string): any {
  //   const item = this._settings.getTypeEnum(settingKey);
  //   return item ? item : null;
  // }

  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // getEnumKeys(enumObj: any): Array<string> {
  //   return Object.keys(enumObj)
  // }

  // updateSetting(key: keyof SettingsModel, param: MatSelectChange) {
  //   this.settings = {
  //     ...this.settings,
  //     [key]: param.value
  //   };
  // }

  // closeDialog(message: string = '') {
  //   this.dialogRef.close(message);
  // }

  // submit() {
  //   this._settings.setSettings(this.settings);
  //   this.closeDialog('Settings Saved! 🎉')
  // }

  // reset() {
  //   this._settings.resetSettings();
  //   this.settings = this._settings.getSettings();
  //   this.dialogRef.close('Reset Successful! 🥳');
  // }

}
