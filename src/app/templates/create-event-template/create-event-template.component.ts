import {Component, ViewChild, OnInit, AfterViewInit, ElementRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DndDropEvent, DropEffect} from 'ngx-drag-drop';
import {MatSnackBar} from '@angular/material';
import {Location} from '@angular/common';
import {TemplateListModel} from '../../shared/models/template-list.model';
import {EventsService} from '../../shared/services/events-service';
import {MessageBoxComponent} from '../../shared/messageBox';
import { SsoService } from 'src/app/shared/services/sso.service';

@Component({
    selector: 'app-create-event-template',
    templateUrl: './create-event-template.component.html',
    styleUrls: ['./create-event-template.component.scss']
})
export class CreateEventTemplateComponent implements OnInit {
    model: TemplateListModel = new TemplateListModel();
    link: string;
    links = [];
    attachmentsName = [];
    layout: any;
    url = '';
    geoCodeItems = [
        {value: '0', name: 'Longitude/Latitude'},
        {value: '1', name: 'Address'}
    ];
    horizontalLayoutActive = false;
    private currentDraggableEvent: DragEvent;
    private currentDragEffectMsg: string;
    private readonly verticalLayout = {
        container: 'row',
        list: 'column',
        dndHorizontal: false
    };
    private readonly horizontalLayout = {
        container: 'row',
        list: 'row',
        dndHorizontal: true
    };
    param: number;
    // eventForm: FormGroup;
    eventFormErrors: any;
    loading = false;
    submitted = false;
    file: any;
    sectionName: any;
    linkItems: any;
    deletedAttachments=[];
    constructor(
        private service: EventsService,
        private ssoService: SsoService,
        private route: ActivatedRoute,
        private router: Router,
        private messageBox: MessageBoxComponent,
        private formBuilder: FormBuilder,
    ) {
        this.setHorizontalLayout(this.horizontalLayoutActive);
        this.param = parseInt(this.route.snapshot.paramMap.get('id'), 0);
        this.eventFormErrors = {
            name: {},
            description: {}
        };
    }

    ngOnInit() {
        this.route.params.subscribe((params: any) => {
            if (params.id) {
                this.service.getTemplateById(params.id).subscribe(result => {
                    if (result.status === 200) {
                        console.log('before model', this.model);
                        this.model = result.result[0];
                        this.model.sections.map(section=>{
                            section.effectAllowed = 'move';
                            section.disable= false;
                            section.handle= true;
                        });
                        if (this.model.photo !== -1) {
                            console.log(this.model.photo );
                            this.ssoService.getImage(this.model.photo).subscribe(x => {
                                this.loadPhoto(x);
                            });
                        }else{
                            this.model.photo=null;
                        }
                        this.model.sections = this.model.sections.map(section => ({
                            ...section,
                            effectAllowed : 'move',
                            disable : false,
                            handle : true
                        }));
                    }
                });

            }
        });
        // this.eventForm = this.formBuilder.group({
        //     name: [null, Validators.compose([Validators.required])],
        //     image: [null, Validators.compose([Validators.required])],
        //     sectionName: [null]
        // });
    }

    backClicked() {
        this.router.navigate(['/templates/templateList']);
    }

    addLink(event, link) {
        event.preventDefault();
        console.log({event , link});
        if (this.model.links === null) {
            this.model.links = [];
        }
        if (event.key === 'Enter') {
            this.model.links.push(link);
            this.link = '';
        }
    }
    prevent(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }
    addEventTemplate() {

        let body = new FormData();
        this.model.sections.map((s, i) => {
            body.append(`sections[${i}][order]`,s.order.toString());
            body.append(`sections[${i}][name]`,s.name);
        });
        // if(this.model.links[0]){
        //     body.append(`links[0]`,this.model.links[0]);
        // }
        body.append('name',this.model.name);
        if (this.model.photo!=null){
            body.append('photo',this.model.photo);
        }
        body.append('locationType', this.model.locationType.toString());

        if (!isNaN(this.param)) {
            //
            // if(this.deletedAttachments.length>0||this.model.attachments.length>0){
            //     let attachments=new FormData();
            //     attachments.append('id',this.param.toString());
            //     attachments.append('model','templates');
            //     this.deletedAttachments.map(
            //         (s, i) => {
            //             attachments.append(`deleted[${i}]`, s);
            //         }
            //     )
            //     // this.model.attachments.map((s, i) => {
            //     //     attachments.append(`attachments[${i}]`,s);
            //     // });
            //     this.service.updateAttachments(attachments).subscribe(result => {
            //         if (result.status === 200) {
            //             this.messageBox.showSuccess(null, 'Attachments updated successfully');
            //             this.router.navigate(['/templates/templateList']);
            //         }
            //     });
            // }


            this.service.updateEventTemplate(body, this.param).subscribe(result => {
                if (result.status === 200) {
                    this.messageBox.showSuccess(null, 'Template updated successfully');
                    this.router.navigate(['/templates/templateList']);
                }
            });
        } else {
            // this.model.attachments.map((s, i) => {
            //     body.append(`attachments[${i}]`,s);
            // });
            this.service.addEventTemplate(body).subscribe(result => {
                if (result.status === 200) {
                    this.messageBox.showSuccess(null, 'Template created successfully');
                    this.router.navigate(['/templates/templateList']);
                }
            });
        }
    }

    detectPhotos(event) {
        if (event.target.files && event.target.files[0]) {
            this.model.photo = event.target.files[0];
            const reader = new FileReader();

            reader.readAsDataURL(event.target.files[0]); // read file as data url

            reader.onload = (data: any) => { // called once readAsDataURL is completed
                this.url = data.target.result;
            };
        }
    }

    addSection() {
        if (this.sectionName.length !== 0) {
            this.model.sections.push({
                order: 1,
                name: this.sectionName,
                effectAllowed: 'move',
                disable: false,
                handle: true
            });
            this.sectionName = '';
        } else {
            this.messageBox.showError(null, 'Section name is required');
        }
    }
    setHorizontalLayout(horizontalLayoutActive: boolean) {

        this.layout = (horizontalLayoutActive) ? this.horizontalLayout : this.verticalLayout;
    }

    onDragStart(event: DragEvent) {

        this.currentDragEffectMsg = '';
        this.currentDraggableEvent = event;

    }

    onDragged(item: any, list: any[], effect: DropEffect) {

        this.currentDragEffectMsg = `Drag ended with effect "${effect}"!`;

        if (effect === 'move') {
            const index = list.indexOf(item);
            list.splice(index, 1);
        }
    }

    onDragEnd(event: DragEvent) {

        this.currentDraggableEvent = event;

    }

    onDrop(event: DndDropEvent, list?: any[]) {

        if (list && (event.dropEffect === 'move')) {
            let index = event.index;
            if (typeof index === 'undefined') {
                index = list.length;
            }
            list.splice(index, 0, event.data);
        }
    }


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

    deleteAttachments(index) {
        this.deletedAttachments.push(this.attachmentsName[index]);
        this.attachmentsName.splice(index, 1);


    }

    deleteSection(index) {
            this.model.sections.splice(index, 1);
    }

    deleteLink(name) {
        const index = this.model.links.indexOf(name);
        if (index !== -1) {
            this.model.links.splice(index, 1);
        }
    }
    loadPhoto(event) {
        // this.model.photo = event;
        const reader = new FileReader();

        reader.readAsDataURL(event); // read file as data url

        reader.onload = (data: any) => { // called once readAsDataURL is completed
            this.url = data.target.result;
        };

    }
    changeGeo() {
        if (Number(this.model.locationType) === 1) {
            // this.model.longitude = '';
            // this.model.latitude = '';
            // this.model.coordinate = '';
        }
    }
    removePhoto() {
        this.url = '';
        this.model.photo = null;

    }
}
