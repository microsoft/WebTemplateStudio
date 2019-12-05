import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridBoxComponent } from './grid-box.component';
import { IGridTextItem } from '../grid.model';

describe('GridBoxComponent', () => {
  let component: GridBoxComponent;
  let fixture: ComponentFixture<GridBoxComponent>;
  let mockGridItem:IGridTextItem = {
    id: 1,
    longDescription: '1',
    orderTotal: 1,
    shipTo: '',
    shortDescription: '',
    status: true,
    title: '',
    orderDate: new Date()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GridBoxComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridBoxComponent);
    component = fixture.componentInstance;
    component.gridItem = mockGridItem;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
