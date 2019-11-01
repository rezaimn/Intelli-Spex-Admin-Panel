import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';

import {ActivatedRoute, Router} from '@angular/router';
import {ProjectsService} from 'src/app/shared/services/project-service';
import {SsoService} from 'src/app/shared/services/sso.service';
import {EventsService} from '../../../shared/services/events-service';
import {MessageBoxComponent} from '../../../shared/messageBox';
import {PostModel} from '../../../shared/models/post-model';

@Component({
    selector: 'app-create-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
    model: PostModel = new PostModel();
    attachmentsName = [];
    deletedAttachments = [];
    geoCodeItems = [
        {value: '0', name: 'Longitude/Latitude'},
        {value: '1', name: 'Address'}
    ];
    deleteConfig = {
        disableClose: false,
        hasBackdrop: true,
        backdropClass: '',
        width: '30%',
        data: {
            title: 'Delete Section',
            subtitle: 'Are you sure to delete this section?'
        },
        height: '',
        position: {
            top: '',
            bottom: '',
            left: '',
            right: ''
        },
    } as MatDialogConfig<any>;
    sectionName = '';
    link: string;
    param: number;
    isNewPhoto = false;
    file: any;
    url = '';
    selectedSection: number;
    selectedEvent: number;

    constructor(
        private service: EventsService,
        private ssoService: SsoService,
        private projectService: ProjectsService,
        private route: ActivatedRoute,
        private router: Router,
        private messageBox: MessageBoxComponent,
        public dialog: MatDialog
    ) {
        this.selectedSection = parseInt(this.route.snapshot.paramMap.get('sectionId'), 0);
        this.selectedEvent = parseInt(this.route.snapshot.paramMap.get('eventId'), 0);

    }

    ngOnInit() {
    }

    addPost() {
        let body = new FormData();


        if (this.model.photo != undefined) {
            body.append('photo', this.model.photo);
        }

        body.append('title', this.model.title.toString());
        body.append('section_id', this.selectedSection.toString());
        body.append('description', this.model.description.toString());
        body.append('location', this.model.location.toString());
        body.append('order', this.model.order.toString());

        this.model.attachments.map((s, i) => {
            body.append(`attachments[${i}]`, s);
        });
        this.service.addPost(body).subscribe(result => {
                if (result.status === 200) {
                    this.messageBox.showSuccess(null, 'Post Added successfully');
                    this.router.navigate(['/events/event-sections/'+this.selectedEvent]);
                }
            }
        );
    }


//

    detectPhotos(event) {

        if (event.target.files && event.target.files[0]) {
            this.model.photo = event.target.files[0];
            const reader = new FileReader();

            reader.readAsDataURL(event.target.files[0]); // read file as data url

            reader.onload = (data: any) => { // called once readAsDataURL is completed
                this.url = data.target.result;
            };
            this.isNewPhoto = true;
        }
    }

//
    detectFiles(event) {
        const files = event.target.files[0];
        this.model.attachments.push(files);
        this.attachmentsName.push(files.name);
        /*  if (files) {
              for (const file of files) {
                  const reader = new FileReader();
                  reader.onload = (e: any) => {
                      this.model.attachments.push(e.target.result);
                      console.log(this.model.attachments)
                  };
                  reader.readAsDataURL(file);
              }
          }*/
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

//
//
    deleteAttachments(index) {
        this.deletedAttachments.push(this.attachmentsName[index]);
        this.attachmentsName.splice(index, 1);


    }

//
// changeGeo();
// {
//     if (Number(this.model.locationType) === 1) {
//         this.model.longitude = '';
//         this.model.latitude = '';
//         this.model.coordinate = '';
//     }
// }
//
    backClicked() {
        this.router.navigate(['/events/event-sections/'+this.selectedEvent]);
    }
    removePhoto() {
        this.isNewPhoto = false;
        this.url = '';
        this.model.photo = undefined;
    }
}
