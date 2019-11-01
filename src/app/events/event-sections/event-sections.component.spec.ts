import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSectionsComponent } from './event-sections.component';

describe('CreateEventTemplateComponent', () => {
  let component: EventSectionsComponent;
  let fixture: ComponentFixture<EventSectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventSectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
