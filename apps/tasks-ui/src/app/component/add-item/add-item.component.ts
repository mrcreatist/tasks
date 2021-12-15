import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemModel } from 'src/app/model';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  form: FormGroup

  constructor (
    public dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemModel
  ) { }

  ngOnInit(): void {
    this._createForm();
  }

  private _createForm() {
    this.form = new FormGroup({
      title: new FormControl(this.data ? this.data?.title : null, Validators.required),
      description: new FormControl(this.data ? this.data?.description : null, Validators.required)
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
