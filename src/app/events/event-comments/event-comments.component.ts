import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
    selector: 'app-event-comments',
    templateUrl: './event-comments.component.html',
    styleUrls: ['./event-comments.component.scss']
})
export class EventCommentsComponent implements OnInit {
    model: EventListModel[] = [];
    @ViewChild('searchEvent') searchReference: ElementRef;
    searchBox = '';
    event;
    baseUrl=AppHelper.APIUrl;
    isLoading = false;
    count = 0;
    offset = 0;
    limit = 8;
    selectedEvent;
    isDownloading=false;
    commentAttachment=undefined;
    commentText='';
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
        private route: ActivatedRoute,
        public dialog: MatDialog,
        private projectService: ProjectsService,
    ) {
        this.selectedEvent = parseInt(this.route.snapshot.paramMap.get('id'), 0);

    }

    ngOnInit() {
        //this.getEventById();
        this.getAllEventComments();

    }

    addEventComment() {
        if(this.commentAttachment||this.commentText!=''){
            let body = new FormData();
            if (this.commentAttachment != undefined) {
                body.append('attachments[0]', this.commentAttachment);
            }
            body.append('comment', this.commentText);
            body.append('event_id', this.selectedEvent.toString());

            this.service.addEventComment(body).subscribe(result => {
                    if (result.status === 200) {
                        this.messageBox.showSuccess(null, 'Comment Added successfully');
                        this.commentText = '';
                        this.commentAttachment = undefined;
                        this.getAllEventComments();
                    }
                }
            );
        }

    }
    backClicked() {
        this.router.navigate(['/events/event-list']);
    }
    detectFiles(event) {
        console.log(this.commentAttachment);
        this.commentAttachment = event.target.files[0];
    }

    deleteAttachment() {
        this.commentAttachment = undefined;
    }
    // getEventById(){
    //     this.service.getEventById(this.selectedEvent).subscribe(result => {
    //         if (result.status === 200) {
    //             this.event=result.result;
    //         }
    //     }
    //     )
    // }
    getAllEventComments(event?) {
        const offset = event ? event.offset : this.offset;
        this.service.getEventComments(this.selectedEvent,this.offset + 1).subscribe(result => {
            this.isLoading = false;
            if (result.status === 200) {
                this.count = result.result.total;
                this.offset = result.result.page - 1;
                this.limit = result.result.perPage;
                this.model = result.result.data;
                this.model.map(eventT=>{
                    eventT.status=false;
                })
            }
        });
    }


}
