import {SectionModel} from './section-model';
import {MetaModel} from './meta.model';

export class ProjectListModel {
    id: number;
    name: string;
    status: boolean;
    created_at: string;
    updated_at: string;
    __meta__: MetaModel;
}
