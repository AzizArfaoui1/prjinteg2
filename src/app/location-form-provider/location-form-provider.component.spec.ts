import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationFormProviderComponent } from './location-form-provider.component';

describe('LocationFormProviderComponent', () => {
  let component: LocationFormProviderComponent;
  let fixture: ComponentFixture<LocationFormProviderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationFormProviderComponent]
    });
    fixture = TestBed.createComponent(LocationFormProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
