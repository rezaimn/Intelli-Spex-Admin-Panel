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
import {PostModel} from '../../shared/models/post-model';
import {SsoService} from '../../shared/services/sso.service';
import {ViewPostComponent} from './view-post/view-post.component';

@Component({
    selector: 'app-event-sections',
    templateUrl: './event-sections.component.html',
    styleUrls: ['./event-sections.component.scss']
})
export class EventSectionsComponent implements OnInit {
    sectionList:any [] = [];
    postList: PostModel[] = [];
    selectedPost: PostModel = new PostModel({});
    @ViewChild('searchEvent') searchReference: ElementRef;
    searchBox = '';
    projectList = [];
    isLoading = false;
    count = 0;
    offset = 0;
    limit = 8;
    selectedEvent: number;
    isDownloading = false;
    term = ' ';
    dialogRefDeleteData: MatDialogRef<any> | null;
    modalConfig = {
        disableClose: false,
        hasBackdrop: true,
        backdropClass: '',
        width: '80%',
        data: {},
        height: '96%',
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
        private ssoService: SsoService,
        public dialog: MatDialog,
        private projectService: ProjectsService,
        private route: ActivatedRoute,
    ) {
        this.selectedEvent = parseInt(this.route.snapshot.paramMap.get('id'), 0);
    }

    ngOnInit() {
        this.getEventData();

    }

    getEventData() {
        this.service.getEventById(this.selectedEvent).subscribe(result => {
            if (result.status === 200) {

                this.sectionList = result.result.sections;
                this.sectionList.map(section=>{
                    section.count=0;
                })

            }
        });
    }

    getSectionsPosts(sectionId, event,index) {
        if (event) {
            this.offset = event.pageIndex | 0;
        }
        this.postList=[];
        this.service.getSectionPosts(sectionId, this.offset + 1).subscribe(result => {
                if (result.status === 200) {
                    this.postList = result.result.data;
                    this.sectionList[index].count = result.result.total;
                    this.offset = result.result.page - 1;
                    this.limit = result.result.perPage;
                    this.postList.map(post => {
                        this.ssoService.getImage(post.photo).subscribe(url => {
                                const reader = new FileReader();

                                reader.readAsDataURL(url); // read file as data url

                                reader.onload = (data: any) => { // called once readAsDataURL is completed
                                    post.photoUrl = data.target.result;
                                };
                            }, (error) => {
                                post.photoUrl = '../../../../assets/images/placeholder.png';
                            }
                        );
                    });

                }
            }
        );
    }

    backClicked() {
        this.router.navigate(['/events/event-list']);
    }

    viewPost(post) {
        this.selectedPost = post;
        this.modalConfig.data = {...post};
        const dialogRef = this.dialog.open(ViewPostComponent, this.modalConfig);
        dialogRef.afterOpened().subscribe(() => {
            // this.service.deleteEvent(post.id).subscribe(resultData => {
            //     if (resultData.status === 200) {
            //         this.model = [...this.model];
            //     }
            // });
        });
    }

}
