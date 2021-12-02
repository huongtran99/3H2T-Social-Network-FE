import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendCreateComponent } from './friend-create.component';

describe('FriendCreateComponent', () => {
  let component: FriendCreateComponent;
  let fixture: ComponentFixture<FriendCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
