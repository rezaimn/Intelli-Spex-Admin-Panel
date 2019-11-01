import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DndDropEvent, DropEffect} from 'ngx-drag-drop';
import {MatDialog, MatDialogConfig} from '@angular/material';

import {ActivatedRoute, Router} from '@angular/router';
import {ProjectsService} from 'src/app/shared/services/project-service';
import {SsoService} from 'src/app/shared/services/sso.service';
import {EventsService} from '../../../shared/services/events-service';
import {MessageBoxComponent} from '../../../shared/messageBox';
import {PostModel} from '../../../shared/models/post-model';
import {DeleteDataDialogComponent} from '../../../core';
import {ViewPostComponent} from './view-post/view-post.component';

@Component({
    selector: 'app-section-posts',
    templateUrl: './section-posts.component.html',
    styleUrls: ['./section-posts.component.scss']
})
export class SectionPostsComponent implements OnInit {
    model: PostModel[] = [];
    url = '';
    isLoading = false;
    count = 0;
    offset = 0;
    limit = 8;
    selectedPost: PostModel = new PostModel({});
    param: number;
    isDownloading = false;
    term = ' ';
    attachmentsName = [];
    deletedAttachments = [];
    panelOpenState = false;
    geoCodeItems = [
        {value: '0', name: 'Longitude/Latitude'},
        {value: '1', name: 'Address'}
    ];
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
    selectedEvent: number;
    selectedSection: number;

    constructor(
        private service: EventsService,
        private ssoService: SsoService,
        private projectService: ProjectsService,
        private route: ActivatedRoute,
        private router: Router,
        private messageBox: MessageBoxComponent,
        public dialog: MatDialog,
        private formBuilder: FormBuilder
    ) {
        this.selectedSection = parseInt(this.route.snapshot.paramMap.get('sectionId'), 0);
        this.selectedEvent = parseInt(this.route.snapshot.paramMap.get('eventId'), 0);

    }

    ngOnInit() {
        this.getEventPosts();

    }

    getEventPosts(event?) {
        if(event){
            this.offset=event.pageIndex|0;
        }
        if (this.selectedEvent) {
            // this.service.getEventPosts(this.selectedEvent,this.offset+1).subscribe(result => {
            //     if (result.status === 200) {
            //         this.model = result.result.data;
            //         this.count = result.result.total;
            //         this.offset = result.result.page - 1;
            //         this.limit = result.result.perPage;
            //         this.model.map(post=>{
            //             this.ssoService.getImage(post.photo).subscribe(url => {
            //                 const reader = new FileReader();
            //
            //                 reader.readAsDataURL(url); // read file as data url
            //
            //                 reader.onload = (data: any) => { // called once readAsDataURL is completed
            //                     post.photoUrl = data.target.result;
            //                 };
            //             },(error)=>{
            //                     post.photoUrl='../../../../assets/images/placeholder.png';
            //                 }
            //             );
            //         })
            //
            //     }
            // }
            // );
        }
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

    backClicked() {
        this.router.navigate(['/events/event-sections/' + this.selectedEvent]);


    }

}
