import { Component, ElementRef, NgZone, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {interval, Subscription} from 'rxjs';
import { filter } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';

import { PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';

const SMALL_WIDTH_BREAKPOINT = 960;

@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent implements OnInit {
  mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  sidePanelOpened;
  options = {
    collapsed: true,
    compact: false,
    boxed: false,
    dark: false,
    dir: 'ltr'
  };

  @ViewChild(PerfectScrollbarDirective) directiveScroll: PerfectScrollbarDirective;

  public config: PerfectScrollbarConfigInterface = {};

  constructor(
    private _element: ElementRef,
    private router: Router,
    public dataSharingService:DataSharingService,
    zone: NgZone) {

  }

  ngOnInit(): void {
    interval(1000)
        .subscribe(() => {
          window.dispatchEvent(new Event('resize'));
        });

  }

  isOver(): boolean {

      return this.mediaMatcher.matches;

  }

  slidToggle() {
    if (this.options.collapsed === true ) {
     
      this.options.collapsed = false;
    }
    else{
      
      this.options.collapsed = true;
    }
  }

}
