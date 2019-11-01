import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTemplateListComponent } from './event-template-list.component';

describe('EventTemplateListComponent', () => {
  let component: EventTemplateListComponent;
  let fixture: ComponentFixture<EventTemplateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventTemplateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
