import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { AngularListComponent } from './Param_SourceName_Kebab.component';
import { FormComponent } from './form/form.component';
import { ListItemComponent } from './list-item/list-item.component';
import { WarningMessageModule } from '../../shared/warning-message/warning-message.module';

describe('ListComponent', () => {
  let component: AngularListComponent;
  let fixture: ComponentFixture<AngularListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AngularListComponent, FormComponent, ListItemComponent],
      imports: [
        WarningMessageModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        NgbAlertModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
