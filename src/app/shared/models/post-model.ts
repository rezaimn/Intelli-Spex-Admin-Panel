
export class PostModel   {
    eventId: number;
    sectionId: number;
    order: number;
    title: string;
    photo: string=undefined;
    photoUrl:string;
    description: string;
    location: string;
    attachments:any[];
    constructor(data:any={}){
        this.eventId=data.eventId||0;
        this.sectionId=data.sectionId||0;
        this.order=data.order||0;
        this.title=data.title||'';
        this.photo=data.photo;
        this.photoUrl=data.photoUrl;
        this.description=data.description||'';
        this.location=data.location||'';
        this.attachments=data.attachments||[];
    }

}
