import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridItemComponent } from './grid-item.component';

describe('GridItemComponent', () => {
  let component: GridItemComponent;
  let fixture: ComponentFixture<GridItemComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [GridItemComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridItemComponent);
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
