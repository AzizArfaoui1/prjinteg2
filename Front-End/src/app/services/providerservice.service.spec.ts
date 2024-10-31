import { TestBed } from '@angular/core/testing';
import { ProviderserviceService } from './providerservice.service';


describe('ProviderserviceService', () => {
  let service: ProviderserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProviderserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
