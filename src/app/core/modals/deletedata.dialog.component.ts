import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
@Component({
  template: `<app-dialogue [title]="data.title"
                [subTitle]="data.subtitle"
                [firstBtn]="'Yes'"
                [lastBtn]="'No'"></app-dialogue>`
})
export class DeleteDataDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }
}


