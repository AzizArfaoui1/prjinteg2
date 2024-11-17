import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderSigninComponent } from './provider-signin.component';

describe('ProviderSignupComponent', () => {
  let component: ProviderSigninComponent;
  let fixture: ComponentFixture<ProviderSigninComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProviderSigninComponent]
    });
    fixture = TestBed.createComponent(ProviderSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
