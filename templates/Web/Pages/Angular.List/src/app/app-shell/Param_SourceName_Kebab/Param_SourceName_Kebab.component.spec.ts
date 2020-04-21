import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { Param_SourceName_PascalComponent } from './Param_SourceName_Kebab.component';
import { FormComponent } from './form/form.component';
import { ListItemComponent } from './list-item/list-item.component';
import { WarningMessageModule } from '../../shared/warning-message/warning-message.module';

describe('Param_SourceName_PascalComponent', () => {
  let component: Param_SourceName_PascalComponent;
  let fixture: ComponentFixture<Param_SourceName_PascalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Param_SourceName_PascalComponent, FormComponent, ListItemComponent],
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
    fixture = TestBed.createComponent(Param_SourceName_PascalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
