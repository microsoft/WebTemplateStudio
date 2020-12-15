import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MasterListComponent } from './master-list.component';

describe('MasterListComponent', () => {
  let component: MasterListComponent;
  let fixture: ComponentFixture<MasterListComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [MasterListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterListComponent);
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
