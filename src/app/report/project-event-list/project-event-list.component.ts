import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventListModel} from '../../shared/models/event-list.model';
import {MessageBoxComponent} from '../../shared/messageBox';
import {EventsService} from '../../shared/services/events-service';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {DeleteDataDialogComponent} from '../../core';
import {DataSharingService} from '../../shared/services/data-sharing.service';
import {ProjectsService} from '../../shared/services/project-service';
import {AppHelper} from '../../shared/appHelper';

@Component({
    selector: 'app-project-event-list',
    templateUrl: './project-event-list.component.html',
    styleUrls: ['./project-event-list.component.scss']
})
export class ProjectEventListComponent implements OnInit {
    model: EventListModel[] = [];
    generatedDownloadLinks=[];
    isLoading = false;
    count = 0;
    id: number;
    offset = 0;
    limit = 8;
    projectId = 0;
    isDownloading = false;
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
        private projectsService: ProjectsService,
        private eventService: EventsService,
        private messageBox: MessageBoxComponent,
        private router: Router,
        private route: ActivatedRoute,
        public dialog: MatDialog,
        private dataSharingService: DataSharingService
    ) {

        this.id = parseInt(this.route.snapshot.paramMap.get('id'), 0);
    }

    ngOnInit() {
        this.getEventList();
        //
    }

    getEventList(event?) {
        const offset = event ? event.offset : this.offset;
        this.projectsService.getProjectEventsByProjectId(this.id, offset + 1).subscribe(result => {
            this.isLoading = false;
            if (result.status === 200) {
                this.count = result.result.total;
                this.offset = result.result.page - 1;
                this.limit = result.result.perPage;
                this.model = result.result.data;
                this.model.map(
                    event=>{
                        event.downloadLink='';
                    }
                )
            } else {
                this.messageBox.showError(null, 'Operation failed!');
            }
        });
    }
    downloadEvent(row,index) {
        this.isDownloading = true;
        this.eventService.getEventReportLink(row.id).subscribe(reportLink => {
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
    backClicked() {
        this.router.navigate(['/reports/report-projects']);
    }
}
