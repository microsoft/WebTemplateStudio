import { TestBed } from '@angular/core/testing';

import { GridService } from './grid.service';

describe('GridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GridService = TestBed.get(GridService);
    expect(service).toBeTruthy();
  });
});
