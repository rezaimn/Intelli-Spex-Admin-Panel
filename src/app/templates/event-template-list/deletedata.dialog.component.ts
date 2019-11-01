import {Component} from '@angular/core';

@Component({
  template: `<app-dialogue [title]="'Delete Event Template'"
                [subTitle]="'Are you sure to delete this event template?'"
                [firstBtn]="'Yes'"
                [lastBtn]="'No'"></app-dialogue>`
})
export class DeleteDataDialogComponent {
}


