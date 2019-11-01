import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionPostsComponent } from './section-posts.component';

describe('CreateEventTemplateComponent', () => {
  let component: SectionPostsComponent;
  let fixture: ComponentFixture<SectionPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
