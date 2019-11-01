import {TServiceResult} from './TServiceResult';

export class TServicePagingResult<T> extends TServiceResult<T> {
    total: number;
    perPage: number;
    page: number;
    lastPage: number;
    data: T;
    constructor(retVal: T, public status: number, data: T) {
        super(retVal, status);
        this.data = data;
    }
}
