import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {
  MatSidenavModule,
  MatCardModule,
  MatMenuModule,
  MatCheckboxModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatTabsModule,
  MatListModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatDialogModule,
  MatProgressBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import {BidiModule} from '@angular/cdk/bidi';

import {
  MenuComponent,
  HeaderComponent,
  SidebarComponent,
  NotificationComponent,
  OptionsComponent,
  AdminLayoutComponent,
  AuthLayoutComponent,
  AccordionAnchorDirective,
  AccordionLinkDirective,
  AccordionDirective,
  DeleteDataDialogComponent, PromptComponent,
} from './core';

import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import {MessageBoxComponent} from './shared/messageBox';
import {SsoService} from './shared/services/sso.service';
import {AuthGuard} from './shared/services/auth-guard.service';
import {ResponseInterceptor} from './shared/interceptors/response.interceptor';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { DialogueModule } from './shared/modules/remove-dialogue/dialogue.module';
import { AddEventModalComponent } from './projects/project-events/add-events-modal.component';
import { DataSharingService } from './shared/services/data-sharing.service';
import {ViewPostComponent} from './events/event-sections/view-post/view-post.component';
import {SafePipe} from './shared/pipes/safe.pipe';
import {SharedModule} from './shared/modules/shared.module';
import {CommonModule} from '@angular/common';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
  minScrollbarLength: 20
};

@NgModule({
  entryComponents: [
    DeleteDataDialogComponent,
      ViewPostComponent
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    NotificationComponent,
    OptionsComponent,
    MenuComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    MessageBoxComponent,
    DeleteDataDialogComponent,
    PromptComponent,
    ViewPostComponent,

  ],
  imports: [
      CommonModule,

    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,

    ToasterModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    LoadingBarRouterModule,
    MatSidenavModule,
    MatDialogModule,
    MatCardModule,
    MatMenuModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatListModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressBarModule,
    FlexLayoutModule,
    BidiModule,
    PerfectScrollbarModule,
    DialogueModule,
      SharedModule,
    InfiniteScrollModule
  ],
  providers: [
      {provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG},
      {provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true},
      SsoService, MessageBoxComponent, ToasterService, AuthGuard,DataSharingService,

],
  bootstrap: [AppComponent]
})
export class AppModule { }
