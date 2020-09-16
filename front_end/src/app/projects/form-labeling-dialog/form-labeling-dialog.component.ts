import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

interface DialogData {
  label: string;
}

@Component({
  selector: 'app-form-labeling-dialog',
  templateUrl: './form-labeling-dialog.component.html',
  styleUrls: ['./form-labeling-dialog.component.scss']
})
export class FormLabelingDialogComponent implements OnInit {

  label = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<FormLabelingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
  }
  
}
