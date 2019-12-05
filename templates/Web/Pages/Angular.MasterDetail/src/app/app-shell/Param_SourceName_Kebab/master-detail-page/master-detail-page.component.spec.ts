import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MasterDetailPageComponent } from './master-detail-page.component';
import { ISampleOrder } from '../master-detail.model';

describe('MasterDetailPageComponent', () => {
  let component: MasterDetailPageComponent;
  let fixture: ComponentFixture<MasterDetailPageComponent>;
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
      declarations: [MasterDetailPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDetailPageComponent);
    component = fixture.componentInstance;
    component.sampleOrder = mockSampleOrder;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
