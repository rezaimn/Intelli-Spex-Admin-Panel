import {Pipe, PipeTransform} from '@angular/core';


/**
 * This Method accept entity id and returns entity.
 */
@Pipe({name: 'getEventDownloadLinkById', pure: false})
export class GetEventDownloadLinkByIdPipe implements PipeTransform {
    transform(generatedDownloadLinkList: any[], eventId) {

        let res= generatedDownloadLinkList.filter(download=>{
            return download.id==eventId;
        });
        if(res.length>0){
            return res[0].link;
        }else {
            return '';
        }
    }
}
