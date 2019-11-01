import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class DataSharingService {
    public projectSelected=0;
    public selectedUserGroup=null;
    public goBackToGroupTab=0;
}
