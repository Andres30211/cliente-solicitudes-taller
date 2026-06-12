import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSolicitud } from './form-solicitud';

describe('FormSolicitud', () => {
  let component: FormSolicitud;
  let fixture: ComponentFixture<FormSolicitud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSolicitud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSolicitud);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
