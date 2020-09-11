import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Param_SourceName_PascalComponent } from './Param_SourceName_Kebab.component';

describe('Param_SourceName_PascalComponent', () => {
  let component: Param_SourceName_PascalComponent;
  let fixture: ComponentFixture<Param_SourceName_PascalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Param_SourceName_PascalComponent]
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
