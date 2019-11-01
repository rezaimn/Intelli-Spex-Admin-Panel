import {Component, OnInit, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.scss']
})

export class DialogueComponent implements OnInit {
  @Input() title = '';
  @Input() subTitle = '';
  @Input() firstBtn = '';
  @Input() lastBtn = '';
  constructor(public dialogRef: MatDialogRef<DialogueComponent>) {}
  ngOnInit() {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}


