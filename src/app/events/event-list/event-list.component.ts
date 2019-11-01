import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {EventListModel} from '../../shared/models/event-list.model';
import {MessageBoxComponent} from '../../shared/messageBox';
import {EventsService} from '../../shared/services/events-service';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {DeleteDataDialogComponent} from '../../core';
import {ProjectsService} from '../../shared/services/project-service';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import {AppHelper} from '../../shared/appHelper';

@Component({
    selector: 'app-event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
    model: any[] = [];
    @ViewChild('searchEvent') searchReference: ElementRef;
    searchBox = '';
    projectList = [];
    isLoading = false;
    count = 0;
    offset = 0;
    limit = 10;
    hide = true;
    isDownloading=false;
    term = ' ';
    dialogRefDeleteData: MatDialogRef<any> | null;
    deleteConfig = {
        disableClose: false,
        data: {
            title: 'Delete Event',
            subtitle: 'Are you sure to delete this event?',
        },
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
        public dialog: MatDialog,
        private projectService: ProjectsService,
    ) {


    }

    ngOnInit() {
        this.getEventList();
        this.getAllProjects();
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
            .subscribe((text: string) => this.searchEvents(text));


    }
    downloadEvent(row,index) {
        this.isDownloading = true;
        this.service.getEventReportLink(row.id).subscribe(reportLink => {
                console.log(reportLink);
                if (reportLink.status === 200) {
                    this.isDownloading=false;
                    let downloadLink = document.createElement('a');
                    downloadLink.title = "my title text";
                    downloadLink.href = `${AppHelper.APIUrl}attachment/download/reports/${reportLink.result}`;
                    // downloadLink.target='_blank';
                    downloadLink.click();
                } else {
                    this.isDownloading = false;
                    this.messageBox.showError(null, 'Create download link failed!');
                }
            },
            (error) => {
                this.isDownloading = false;
                this.messageBox.showError(null, 'Create download link failed!');
            }
        );
    }
    getAllProjects() {
        this.projectService.getProjectList(null, 'all').subscribe(result => {
            this.isLoading = false;
            if (result.status === 200) {
                this.projectList = result.result;
            }
        });

    }

    getEventList(event?) {
        const offset = event ? event.offset : this.offset;
        this.service.getEventList(offset + 1).subscribe(result => {
            this.isLoading = false;
            if (result.status === 200) {
                this.count = result.result.total;
                this.offset = result.result.page - 1;
                this.limit = result.result.perPage;
                this.model = result.result.data;
                this.model.map(event=>{
                    event.selectedSectionId=0;
                })
            }
        });
    }
    statusChanged(event,index){
        this.service.changeEventStatus(event.id).subscribe(
            (result) => {
                if (result.status === 200) {
                    this.messageBox.showSuccess(null, 'Status changed Succeeded!');
                }
            },
            error1 => {
                this.model[index].status=!event.status;
            }
        );
    }
    searchEvents(search) {
        this.searchBox = search;
        if (search.length > 0) {
            this.service.searchEvent(search).subscribe(
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
            this.getEventList();
        }
    }

    deleteBtn(row, rowIndex) {
        const dialogRef = this.dialog.open(DeleteDataDialogComponent, this.deleteConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.service.deleteEvent(row.id).subscribe(resultData => {
                    if (resultData.status === 200) {
                        this.model.splice(rowIndex, 1);
                        this.model = [...this.model];
                        this.messageBox.showSuccess(null, 'Delete Succeeded!');
                    }
                });
            }
        });
    }
    eventLike(event,index){

        this.service.eventLike(event.id).subscribe(result => {
                if (result.status === 200) {
                    if(this.model[index].__meta__.is_liked=='1'){
                        this.model[index].__meta__.is_liked='0';
                        this.model[index].__meta__.count_likes=(parseInt(this.model[index].__meta__.count_likes)-1).toString();
                    }else{
                        this.model[index].__meta__.is_liked='1';
                        this.model[index].__meta__.count_likes=(parseInt(this.model[index].__meta__.count_likes)+1).toString();
                    }
                }
            }
        );
        // this.service.eventLike(body).subscribe(result => {
        //         if (result.status === 200) {
        //             this.model[index].liked=!this.model[index].liked;
        //         }
        //     }
        // );
    }
}
