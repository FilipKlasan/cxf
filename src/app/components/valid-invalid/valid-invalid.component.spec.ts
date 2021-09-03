import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidInvalidComponent } from './valid-invalid.component';

describe('ValidInvalidComponent', () => {
  let component: ValidInvalidComponent;
  let fixture: ComponentFixture<ValidInvalidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidInvalidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidInvalidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
