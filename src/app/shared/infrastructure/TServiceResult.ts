import {ServiceResult} from './ServiceResult';

export class TServiceResult<T> extends ServiceResult {
    result: T;

    constructor(retVal: T, public status: number) {
        super(status);
        this.result = retVal;
    }
}
