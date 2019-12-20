import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GridBoxComponent } from './grid-box.component';

describe('GridBoxComponent', () => {
  let component: GridBoxComponent;
  let fixture: ComponentFixture<GridBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GridBoxComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridBoxComponent);
    component = fixture.componentInstance;
    component.gridItem = {
      id: 1,
      longDescription: '1',
      orderTotal: 1,
      shipTo: '',
      shortDescription: '',
      status: true,
      title: '',
      orderDate: new Date()
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
