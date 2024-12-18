import { TestBed } from '@angular/core/testing';

import { PairConversionService } from './pair-conversion.service';

describe('PairConversionService', () => {
  let service: PairConversionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PairConversionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
