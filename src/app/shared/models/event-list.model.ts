import {SectionModel} from './section-model';
import {UserModel} from './user.model';

export class EventListModel   {
    id: number;
    user_id: number;
    template_id: number;
    name: string;
    photo: string;
    locationType: number;
    location: string;
    sections: SectionModel;
    attachments: string[];
    links: string[];
    created_at: string;
    updated_at: string;
    user: UserModel;
    template: string;
    downloadLink:string;
    status=false;
    liked:boolean;
}
