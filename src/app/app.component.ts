import {Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {BodyOutputType, ToasterConfig} from 'angular2-toaster';
@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <toaster-container [toasterconfig]="toasterconfig"></toaster-container>`,
})
export class AppComponent {
  toasterconfig: ToasterConfig = new ToasterConfig({
    limit: 5,
    animation: 'fade',
    showCloseButton: false,
    positionClass: 'toast-top-right',
    mouseoverTimerStop: false,
    newestOnTop: false,
    bodyOutputType: BodyOutputType.TrustedHtml,
    timeout: 10000,
  });
  constructor(translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }
}
