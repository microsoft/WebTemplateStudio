import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AngularMasterDetailComponent } from './Param_SourceName_Kebab.component';
import { MasterList } from './master-list/master-list.component';
import { PageComponent } from './page/page.component';
import { WarningMessageModule } from '../../shared/warning-message/warning-message.module';

describe('MasterDetailComponent', () => {
  let component: AngularMasterDetailComponent;
  let fixture: ComponentFixture<AngularMasterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AngularMasterDetailComponent, MasterList, PageComponent],
      imports: [WarningMessageModule, HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularMasterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});