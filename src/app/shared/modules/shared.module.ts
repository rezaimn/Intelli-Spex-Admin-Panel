import {NgModule} from '@angular/core';

import {SafePipe} from '../pipes/safe.pipe';

@NgModule({
    imports: [

    ],
    declarations: [
       SafePipe

    ],


    exports:[
       SafePipe

    ],
    providers: [

    ]
})

/**
 * we added some modules,services,pipes and components here to reuse them in different parts of the app.
 */
export class SharedModule {
}
