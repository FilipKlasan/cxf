import { TestBed, async, inject } from '@angular/core/testing';

import { PriceGuard } from './price.guard';

describe('PriceGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PriceGuard]
    });
  });

  it('should ...', inject([PriceGuard], (guard: PriceGuard) => {
    expect(guard).toBeTruthy();
  }));
});
