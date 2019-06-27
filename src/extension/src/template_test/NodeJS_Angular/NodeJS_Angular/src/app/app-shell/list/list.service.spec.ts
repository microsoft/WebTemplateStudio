import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ListService } from './list.service';

describe('ListService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: ListService = TestBed.get(ListService);
    expect(service).toBeTruthy();
  });
});
