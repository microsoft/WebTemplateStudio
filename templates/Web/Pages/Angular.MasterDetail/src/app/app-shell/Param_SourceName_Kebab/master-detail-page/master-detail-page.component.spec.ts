import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MasterDetailPageComponent } from './master-detail-page.component';

describe('MasterDetailPageComponent', () => {
  let component: MasterDetailPageComponent;
  let fixture: ComponentFixture<MasterDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MasterDetailPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDetailPageComponent);
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
