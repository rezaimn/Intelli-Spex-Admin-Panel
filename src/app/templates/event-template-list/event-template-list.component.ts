import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {EventListModel} from '../../shared/models/event-list.model';
import {MessageBoxComponent} from '../../shared/messageBox';
import {EventsService} from '../../shared/services/events-service';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {DeleteDataDialogComponent} from './deletedata.dialog.component';
import {Observable} from 'rxjs';
import 'rxjs/Rx';

@Component({
  selector: 'app-event-template-list',
  templateUrl: './event-template-list.component.html',
  styleUrls: ['./event-template-list.component.scss']
})
export class EventTemplateListComponent implements OnInit {
    model: EventListModel[] = [];
    isLoading = false;
    count = 0;
    offset = 0;
    limit = 8;
    term = ' ';
    @ViewChild('searchTemplates') searchReference: ElementRef;
    searchBox = '';
    dialogRefDeleteData: MatDialogRef<any> | null;
    deleteConfig = {
        disableClose: false,
        hasBackdrop: true,
        backdropClass: '',
        width: '30%',
        height: '',
        position: {
            top: '',
            bottom: '',
            left: '',
            right: ''
        },
    } as MatDialogConfig<any>;
    constructor(
        private service: EventsService,
        private messageBox: MessageBoxComponent,
        private router: Router,
        public dialog: MatDialog
    ) {

    }
    ngOnInit() {
        this.getEventTemplateList();
        Observable.fromEvent(this.searchReference.nativeElement, 'keyup')
        // get value
            .map((evt: any) => evt.target.value)
            // text length must be > 2 chars
            //.filter(res => res.length > 2)
            // emit after 1s of silence
            .debounceTime(500)
            // emit only if data changes since the last emit
            .distinctUntilChanged()
            // subscription
            .subscribe((text: string) => this.searchTemplates(text));
    }
    backClicked() {
        this.router.navigate(['/events/event-list']);
    }
  getEventTemplateList(event?) {
      const offset = event ? event.offset : this.offset;
        this.service.getEventTemplateList(offset+1).subscribe(result => {
            this.isLoading = false;
            if (result.status === 200) {
                this.count = result.result.total;
                this.offset = result.result.page-1;
                this.limit = result.result.perPage;
                this.model = result.result.data;
            }
        });
    }
    searchTemplates(search) {
        this.searchBox = search;
        if (search.length > 0) {
            this.service.searchTemplates(search).subscribe(
                (result) => {
                    if (result.status === 200) {
                        this.count = result.result.length;
                        this.offset = 0;
                        this.limit = result.result.length;
                        this.model = result.result;
                    }
                }
            );
        } else {
            this.getEventTemplateList();
        }


    }
    deleteBtn(row, rowIndex) {
        const dialogRef = this.dialog.open(DeleteDataDialogComponent, this.deleteConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.service.deleteEventٍTemplate(row.id).subscribe(resultData => {
                    if (resultData.status === 200) {
                        this.model.splice(rowIndex, 1);
                        this.model = [...this.model];
                        this.messageBox.showSuccess(null, resultData.result);
                    } else {
                        this.messageBox.showError(null, resultData.result);
                    }
                });
            }
        });
    }
}
