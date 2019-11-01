import {Pipe, PipeTransform} from '@angular/core';


/**
 * This Method accept entity id and returns entity.
 */
@Pipe({name: 'IsUserInGroup', pure: false})
export class IsUserInGroupPipe implements PipeTransform {
    transform(selectedUserList: any[], userId) {
        let status = false;
        let selectedUser = selectedUserList.filter(userT => {
            return userT == userId;
        });
        if (selectedUser.length == 1) {
            status = selectedUser[0] == userId ? true : false;
        }
        return status;
    }
}
