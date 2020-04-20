import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AngularListService } from './Param_SourceName_Kebab.service';

describe('AngularListService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: AngularListService = TestBed.inject(AngularListService);
    expect(service).toBeTruthy();
  });
});
