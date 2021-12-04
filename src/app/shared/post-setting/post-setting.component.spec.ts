import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSettingComponent } from './post-setting.component';

describe('PostSettingComponent', () => {
  let component: PostSettingComponent;
  let fixture: ComponentFixture<PostSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
