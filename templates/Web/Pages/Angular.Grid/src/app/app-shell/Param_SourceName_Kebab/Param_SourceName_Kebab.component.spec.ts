import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AngularGridComponent } from './Param_SourceName_Kebab.component';
import { GridItemComponent } from './grid-item/grid-item.component';
import { WarningMessageModule } from '../../shared/warning-message/warning-message.module';

describe('GridComponent', () => {
  let component: AngularGridComponent;
  let fixture: ComponentFixture<AngularGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AngularGridComponent, GridItemComponent],
      imports: [WarningMessageModule, HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
