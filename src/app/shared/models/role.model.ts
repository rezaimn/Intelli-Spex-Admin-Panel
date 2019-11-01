import {PivotModel} from './pivot.model';

export class RoleModel {
    id: number;
    slug: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    pivot: PivotModel;
}
