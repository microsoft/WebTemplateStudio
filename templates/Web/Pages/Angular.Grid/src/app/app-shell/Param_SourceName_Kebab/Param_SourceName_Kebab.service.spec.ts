import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AngularGridService } from './Param_SourceName_Kebab.service';

describe('AngularGridService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: AngularGridService = TestBed.inject(AngularGridService);
    expect(service).toBeTruthy();
  });
});
