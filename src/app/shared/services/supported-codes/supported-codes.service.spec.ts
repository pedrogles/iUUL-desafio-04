import { TestBed } from '@angular/core/testing';

import { SupportedCodesService } from './supported-codes.service';

describe('CoinsListService', () => {
  let service: SupportedCodesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportedCodesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
