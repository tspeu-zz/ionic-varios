import { TestBed } from '@angular/core/testing';

import { PockedexService } from './pockedex.service';

describe('PockedexService', () => {
  let service: PockedexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PockedexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
