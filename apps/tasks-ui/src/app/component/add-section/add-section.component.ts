import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardModel } from '../../model';

@Component({
  selector: 'tasks-ui-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.scss']
})
export class AddSectionComponent implements OnInit {

  form: FormGroup;

  constructor (
    public dialogRef: MatDialogRef<AddSectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BoardModel
  ) { }

  ngOnInit(): void {
    this._createForm();
  }

  private _createForm() {
    this.form = new FormGroup({
      name: new FormControl(this.data ? this.data?.name : null, Validators.required)
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value.name);
    } else {
      this.form.markAllAsTouched();
    }
  }

}
