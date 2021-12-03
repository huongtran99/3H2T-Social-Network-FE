import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileEditInformationComponent } from './my-profile-edit-information.component';

describe('MyProfileEditInformationComponent', () => {
  let component: MyProfileEditInformationComponent;
  let fixture: ComponentFixture<MyProfileEditInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProfileEditInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileEditInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
