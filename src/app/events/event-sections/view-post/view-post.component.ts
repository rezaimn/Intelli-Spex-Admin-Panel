import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig} from '@angular/material';

import {ActivatedRoute, Router} from '@angular/router';
import {ProjectsService} from 'src/app/shared/services/project-service';
import {SsoService} from 'src/app/shared/services/sso.service';
import {EventsService} from '../../../shared/services/events-service';
import {MessageBoxComponent} from '../../../shared/messageBox';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import {debounceTime} from 'rxjs/operators';
import {AppHelper} from '../../../shared/appHelper';
@Component({
    selector: 'app-view-post',
    templateUrl: './view-post.component.html',
    styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {
    url = '';
    baseUrl=AppHelper.APIUrl;
    selectedSection: number;
    selectedEvent: number;
    commentAttachment = undefined;
    allComments = [];
    commentText = '';
    liked = false;
    offset=1;
    @ViewChild('lazyScroll', {read: ElementRef}) public scrollElement: ElementRef;
    constructor(
        private service: EventsService,
        private ssoService: SsoService,
        private projectService: ProjectsService,
        private route: ActivatedRoute,
        private router: Router,
        private messageBox: MessageBoxComponent,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        this.selectedSection = parseInt(this.route.snapshot.paramMap.get('sectionId'), 0);
        this.selectedEvent = parseInt(this.route.snapshot.paramMap.get('eventId'), 0);


    }

    ngOnInit() {
        this.getAllPostComments();
        Observable.fromEvent(this.scrollElement.nativeElement, 'scroll')
            .pipe(debounceTime(700))
            .subscribe((e: any) => this.onScroll(e));
    }
    onScroll (event) {
        this.offset++;
        this.getAllPostComments()
    }
    getAllPostComments() {
        this.service.getPostComments(this.data.id, this.offset).subscribe(result => {
                if (result.status === 200) {
                    Array.prototype.push.apply(this.allComments , result.result.data);
                }
            }
        );
    }
    addPostComment() {
        if(this.commentAttachment||this.commentText!=''){
            let body = new FormData();
            if (this.commentAttachment != undefined) {
                body.append('attachments[0]', this.commentAttachment);
            }
            body.append('comment', this.commentText);
            body.append('post_id', this.data.id.toString());

            this.service.addPostComment(body).subscribe(result => {
                    if (result.status === 200) {
                        this.messageBox.showSuccess(null, 'Comment Added successfully');
                        this.commentText = '';
                        this.commentAttachment = undefined;
                        this.allComments=[];
                        this.offset=1;
                        this.getAllPostComments();
                    }
                }
            );
        }

    }



//
    detectFiles(event) {
        console.log(this.commentAttachment);
        this.commentAttachment = event.target.files[0];
    }

    deleteAttachment() {
        this.commentAttachment = undefined;
    }

//
    loadPhoto(event) {
        // this.model.photo = event;
        const reader = new FileReader();

        reader.readAsDataURL(event); // read file as data url

        reader.onload = (data: any) => { // called once readAsDataURL is completed
            this.url = data.target.result;
        };
    }


    // downloadAttachment(name) {
    //     this.service.downloadAttachment(name);
    //
    // }
    postLike(){


        this.service.postLike(this.data.id).subscribe(result => {
                if (result.status === 200) {
                    if(this.data.__meta__.is_liked=='1'){
                        this.data.__meta__.is_liked='0';
                        this.data.__meta__.count_likes=(parseInt(this.data.__meta__.count_likes)-1).toString();
                    }else{
                        this.data.__meta__.is_liked='1';
                        this.data.__meta__.count_likes=(parseInt(this.data.__meta__.count_likes)+1).toString();
                    }
                }
            }
        );
    }
    removePhoto() {
        this.url = '';
        //this.model.photo = undefined;
    }
}
