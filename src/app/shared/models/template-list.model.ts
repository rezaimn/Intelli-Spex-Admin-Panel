import {SectionModel} from './section-model';
import {UserModel} from './user.model';

export class TemplateListModel {
    id: number;
    user_id: number;
    template_id: number;
    name: string;
    photo: any;
    locationType:string='0';
    location: string;
    sections: SectionModel[] = [];
    attachments: string[] = [];
    links: string[] = [];
    created_at: string;
    updated_at: string;
    user: UserModel;
    template: string;
}
