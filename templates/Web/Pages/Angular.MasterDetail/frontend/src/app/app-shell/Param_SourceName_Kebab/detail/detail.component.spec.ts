import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailComponent } from './detail.component';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [DetailComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
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
