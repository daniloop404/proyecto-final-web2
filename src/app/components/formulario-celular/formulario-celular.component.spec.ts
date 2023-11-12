import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCelularComponent } from './formulario-celular.component';

describe('FormularioCelularComponent', () => {
  let component: FormularioCelularComponent;
  let fixture: ComponentFixture<FormularioCelularComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioCelularComponent]
    });
    fixture = TestBed.createComponent(FormularioCelularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
