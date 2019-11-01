import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DndDropEvent, DropEffect} from 'ngx-drag-drop';
import {EventsService} from '../../shared/services/events-service';
import {TemplateListModel} from '../../shared/models/template-list.model';
import {CreateEventModel} from '../../shared/models/create-event.model';
import {MessageBoxComponent} from '../../shared/messageBox';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DeleteDataDialogComponent} from '../../core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectsService} from 'src/app/shared/services/project-service';
import {SsoService} from 'src/app/shared/services/sso.service';
import {SectionModel} from '../../shared/models/section-model';

@Component({
    selector: 'app-create-event',
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
    model: CreateEventModel = new CreateEventModel();
    templateItems: TemplateListModel[] = [];
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
    links = [];
    layout: any;
    projects = [];
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
    // eventForm: FormGroup;
    // eventFormErrors: any;
    file: any;
    url = '';

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
        this.setHorizontalLayout(this.horizontalLayoutActive);
        this.param = parseInt(this.route.snapshot.paramMap.get('id'), 0);
        // this.eventFormErrors = {
        //     title: {},
        //     description: {}
        // };
    }

    ngOnInit() {
        this.route.params.subscribe((params: any) => {
            if (params.id) {
                this.service.getEventById(params.id).subscribe(result => {
                    if (result.status === 200) {
                        this.model = result.result;
                        this.model.sections.map(section => {
                            section.effectAllowed = 'move';
                            section.disable = false;
                            section.handle = true;
                        });
                        if (this.model.template_id == null || this.model.template_id == 'null' || this.model.template_id == 0) {
                            this.model.template_id = 0;
                            this.model.template = false;
                        }
                        if (this.model.photo !== '-1') {
                            this.ssoService.getImage(this.model.photo).subscribe(x => {
                                this.loadPhoto(x);
                            });
                        } else {
                            this.model.photo = undefined;
                        }
                        // if (this.model.locationType == '1') {
                        //     this.model.address = result.result.location;
                        // } else {
                        //     let locationTemp = result.result.location.split(',');
                        //     this.model.latitude = locationTemp[0];
                        //     this.model.longitude = locationTemp[1];
                        // }
                    }
                });
            }
        });
        //this.getTemplateItems();
        this.getProjectList();
        this.getEventTemplateListDropDown();
        // this.eventForm = this.formBuilder.group({
        //     name: ['', Validators.required],
        //     template: [''],
        //     geoCode: [''],
        //     image: [''],
        //     // address: [''],
        //     // longitude: [''],
        //     // latitude: [''],
        //     // link: [''],
        //     sectionName: [''],
        //     'project_id': ['', Validators.required]
        // });
       // console.log('fffffffffffffff', this.model.photo);
    }

    getProjectList() {
        this.projectService.getProjectList(1, 'all').subscribe(result => {
            if (result.status === 200) {
                this.projects = result.result;
            }
        });
    }

    getEventTemplateListDropDown() {
        this.service.getEventTemplateListDropDown().subscribe(result => {
            if (result.status === 200) {
                this.templateItems = result.result.data;
            }
        });
    }

    addLink(event, link) {
        event.preventDefault();
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

    deleteLink(name) {
        const index = this.model.links.indexOf(name);
        if (index !== -1) {
            this.model.links.splice(index, 1);
            this.messageBox.showSuccess(null, 'Delete Succeeded!');
        }
    }

    addEvent() {
        let body = new FormData();

        this.model.template_id = !isNaN(Number(this.model.template_id)) ? Number(this.model.template_id) : undefined;
        if (Number(this.model.template_id) === 0 || this.model.template_id === undefined) {
            this.model.template = false;
            delete this.model.template_id;

        } else {
            this.model.template = true;
            this.model.templateId = this.model.template_id;
        }
        if (this.model.photo != undefined) {
            body.append('photo', this.model.photo);
        }
        body.append('template', 'false');
        this.model.sections.map((s, i) => {
            body.append(`sections[${i}][order]`, s.order.toString());
            body.append(`sections[${i}][name]`, s.name);
        });
        body.append('name', this.model.name.toString());
        body.append('projectId', this.model.project_id.toString());
        body.append('locationType', this.model.locationType.toString());
        body.append('location', '0,0');

        if (!isNaN(this.param)) {
            // if ((this.deletedAttachments.length > 0 || this.model.attachments.length > 0) && !this.model.template) {
            //     let attachments = new FormData();
            //     attachments.append('id', this.param.toString());
            //     attachments.append('model', 'events');
            //     this.deletedAttachments.map(
            //         (s, i) => {
            //             attachments.append(`deleted[${i}]`, s);
            //         }
            //     );
            //     this.model.attachments.map((s, i) => {
            //         attachments.append(`attachments[${i}]`, s);
            //     });
            //     this.service.updateAttachments(attachments).subscribe(
            //         result => {
            //             if (result.status === 200) {
            //                 this.messageBox.showSuccess(null, 'Attachments updated successfully');
            //             }
            //         }
            //     );
            // }


            this.service.updateEvent(
                body,
                this.param
            ).subscribe(result => {
                    if (result.status === 200) {
                        this.messageBox.showSuccess(null, 'Event Updated successfully');
                        this.router.navigate(['/events/event-list']);
                    }
                }
            );
        } else {
            this.service.addEvent(
                body
            ).subscribe(result => {
                    if (result.status === 200) {
                        this.messageBox.showSuccess(null, 'Event Added successfully');
                        this.router.navigate(['/events/event-list']);
                    }
                }
            );
        }
    }

    detectPhotos(event) {
        console.log(event.target.files, 'ggggggggggggggggggggggggg');
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


    loadPhoto(event) {
        // this.model.photo = event;
        const reader = new FileReader();

        reader.readAsDataURL(event); // read file as data url

        reader.onload = (data: any) => { // called once readAsDataURL is completed
            this.url = data.target.result;
        };
    }

    // getTemplateItems() {
    //     this.service.getTemplateItems().subscribe(result => {
    //         if (result.status === 200) {
    //             this.templateItems = result.result.data;
    //         }
    //     });
    // }

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

        if (list
            && (event.dropEffect === 'copy'
                || event.dropEffect === 'move')) {

            let index = event.index;

            if (typeof index === 'undefined') {

                index = list.length;
            }

            list.splice(index, 0, event.data);
        }
    }

    deleteSection(index) {

        this.model.sections.splice(index, 1);

    }

    changeTemplate(templateId) {
        if (templateId != 0) {
            this.service.getTemplateById(templateId).subscribe(result => {
                if (result.status === 200) {
                    if (result.status === 200) {
                        this.model = result.result[0];
                        this.model.name = '';
                        this.model.sections.map(section => {
                            section.effectAllowed = 'move';
                            section.disable = false;
                            section.handle = true;
                        });
                        if (this.model.photo !== '-1') {
                            this.ssoService.getImage(this.model.photo).subscribe(x => {
                                this.loadPhoto(x);
                            });
                        } else {
                            this.model.photo = undefined;
                        }
                    }
                }
            });

        } else {
            this.model = new CreateEventModel();
        }

    }


    changeGeo() {
        if (Number(this.model.locationType) === 1) {
            this.model.longitude = '';
            this.model.latitude = '';
            this.model.location = '';
        }
    }

    removePhoto() {
        this.isNewPhoto = false;
        this.url = '';
        this.model.photo = undefined;
    }
    backClicked(){
        this.router.navigate(['/events/event-list']);
    }
}
