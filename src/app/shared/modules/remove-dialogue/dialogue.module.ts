import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatExpansionModule, MatSnackBarModule, MatCheckboxModule,
} from '@angular/material';

import 'hammerjs';

import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {
  MatInputModule,
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {DialogueComponent} from './component/dialogue.component';
import {FullscreenOverlayContainer, OverlayContainer} from '@angular/cdk/overlay';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatSelectModule,
    MatSnackBarModule,
    FlexLayoutModule,
    NgxDatatableModule,
    MatExpansionModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
  ],
  providers: [
    {provide: OverlayContainer, useClass: FullscreenOverlayContainer},
  ],
  declarations: [
    DialogueComponent,
  ],
  bootstrap: [],
  exports: [DialogueComponent]
})

export class DialogueModule {}
