import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MasterList } from './master-list.component';

describe('MasterList', () => {
  let component: MasterList;
  let fixture: ComponentFixture<MasterList>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MasterList]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterList);
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
