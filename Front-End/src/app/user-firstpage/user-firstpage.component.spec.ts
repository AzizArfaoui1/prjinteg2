import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFirstpageComponent } from './user-firstpage.component';

describe('UserFirstpageComponent', () => {
  let component: UserFirstpageComponent;
  let fixture: ComponentFixture<UserFirstpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserFirstpageComponent]
    });
    fixture = TestBed.createComponent(UserFirstpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
