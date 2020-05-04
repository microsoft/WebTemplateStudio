import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Param_SourceName_PascalService } from './Param_SourceName_Kebab.service';

describe('Param_SourceName_PascalService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: Param_SourceName_PascalService = TestBed.inject(Param_SourceName_PascalService);
    expect(service).toBeTruthy();
  });
});
