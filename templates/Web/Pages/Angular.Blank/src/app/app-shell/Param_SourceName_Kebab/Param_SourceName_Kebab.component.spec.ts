import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularBlankComponent } from './Param_SourceName_Kebab.component';

describe('AngularBlankComponent', () => {
  let component: AngularBlankComponent;
  let fixture: ComponentFixture<AngularBlankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AngularBlankComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
