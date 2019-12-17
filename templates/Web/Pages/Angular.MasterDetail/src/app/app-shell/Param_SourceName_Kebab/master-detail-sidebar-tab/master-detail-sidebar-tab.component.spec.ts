import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MasterDetailSidebarTabComponent } from './master-detail-sidebar-tab.component';

describe('ListItemComponent', () => {
  let component: MasterDetailSidebarTabComponent;
  let fixture: ComponentFixture<MasterDetailSidebarTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MasterDetailSidebarTabComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDetailSidebarTabComponent);
    component = fixture.componentInstance;
    component.sampleOrder = {
      title: '1',
      id: 1,
      status: '',
      orderDate: '',
      shipTo: '',
      orderTotal: 1,
      shortDescription: '',
      longDescription: '',
      imageSrc: ''
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
