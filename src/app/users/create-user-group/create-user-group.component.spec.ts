import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserGroupComponent } from './create-user-group.component';

describe('CreateEventTemplateComponent', () => {
  let component: CreateUserGroupComponent;
  let fixture: ComponentFixture<CreateUserGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUserGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
