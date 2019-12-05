import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MasterDetailSidebarTabComponent } from './master-detail-sidebar-tab.component';
import { ISampleOrder } from '../master-detail.model';

describe('ListItemComponent', () => {
  let component: MasterDetailSidebarTabComponent;
  let fixture: ComponentFixture<MasterDetailSidebarTabComponent>;
  let mockSampleOrder:ISampleOrder = {title: '1',
    id: 1,
    status: '',
    orderDate: '',
    shipTo: '',
    orderTotal: 1,
    shortDescription: '',
    longDescription: '',
    imageSrc: ''
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MasterDetailSidebarTabComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDetailSidebarTabComponent);
    component = fixture.componentInstance;
    component.sampleOrder = mockSampleOrder;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
