import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AngularMasterDetailService } from './Param_SourceName_Kebab.service';

describe('MasterDetailService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: AngularMasterDetailService = TestBed.inject(AngularMasterDetailService);
    expect(service).toBeTruthy();
  });
});
