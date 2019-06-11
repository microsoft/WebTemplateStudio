import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridComponent } from './grid.component';

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
