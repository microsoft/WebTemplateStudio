import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { GridService } from './grid.service';

describe('GridService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: GridService = TestBed.get(GridService);
    expect(service).toBeTruthy();
  });
});
