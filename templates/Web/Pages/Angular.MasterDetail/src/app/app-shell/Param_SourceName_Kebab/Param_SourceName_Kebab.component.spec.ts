import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AngularMasterDetailComponent } from './Param_SourceName_Kebab.component';
import { MasterDetailSidebarTabComponent } from './master-detail-sidebar-tab/master-detail-sidebar-tab.component';
import { MasterDetailPageComponent } from './master-detail-page/master-detail-page.component';
import { WarningMessageModule } from '../../shared/warning-message/warning-message.module';

describe('MasterDetailComponent', () => {
  let component: AngularMasterDetailComponent;
  let fixture: ComponentFixture<MasterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AngularMasterDetailComponent, MasterDetailSidebarTabComponent, MasterDetailPageComponent],
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