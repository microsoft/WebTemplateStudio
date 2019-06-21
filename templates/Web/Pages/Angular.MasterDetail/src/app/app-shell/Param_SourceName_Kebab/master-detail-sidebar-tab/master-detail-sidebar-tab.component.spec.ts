import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDetailSidebarTabComponent } from './master-detail-sidebar-tab.component';

describe('ListItemComponent', () => {
  let component: MasterDetailSidebarTabComponent;
  let fixture: ComponentFixture<MasterDetailSidebarTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MasterDetailSidebarTabComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDetailSidebarTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
