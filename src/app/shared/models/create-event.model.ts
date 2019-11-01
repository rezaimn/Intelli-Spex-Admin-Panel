import {SectionModel} from './section-model';

export class CreateEventModel {
    template: any;
    project_id: number;
    template_id:any= 0;
    templateId = 0;
    locationType:string='0';
    location: string;
    latitude: string;
    longitude: string;
    address: string;
    name: string;
    links: any= [];
    sections: SectionModel[] = [];
    photo: undefined;
    attachments:any[]=[];
}
