import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSigninComponent } from './user-signin.component';

describe('UserSignupComponent', () => {
  let component: UserSigninComponent;
  let fixture: ComponentFixture<UserSigninComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserSigninComponent]
    });
    fixture = TestBed.createComponent(UserSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
