import { TestBed } from '@angular/core/testing';

import { CelularesService } from './celulares.service';

describe('CelularesService', () => {
  let service: CelularesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CelularesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
