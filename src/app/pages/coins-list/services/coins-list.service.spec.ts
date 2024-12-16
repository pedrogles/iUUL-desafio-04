import { TestBed } from '@angular/core/testing';

import { CoinsListService } from './coins-list.service';

describe('CoinsListService', () => {
  let service: CoinsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoinsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
