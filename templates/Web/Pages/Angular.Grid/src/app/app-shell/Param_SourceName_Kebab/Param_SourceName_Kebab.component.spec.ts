import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AngularGridComponent } from './Param_SourceName_Kebab.component';
import { GridBoxComponent } from './grid-box/grid-box.component';
import { WarningMessageModule } from '../../shared/warning-message/warning-message.module';

describe('GridComponent', () => {
  let component: AngularGridComponent;
  let fixture: ComponentFixture<AngularGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AngularGridComponent, GridBoxComponent],
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
