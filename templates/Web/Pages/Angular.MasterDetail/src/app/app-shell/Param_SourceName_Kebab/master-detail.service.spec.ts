import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MasterDetailService } from './master-detail.service';

describe('MasterDetailService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: MasterDetailService = TestBed.get(MasterDetailService);
    expect(service).toBeTruthy();
  });
});
