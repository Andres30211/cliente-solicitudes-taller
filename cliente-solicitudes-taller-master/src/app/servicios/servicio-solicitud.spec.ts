import { TestBed } from '@angular/core/testing';

import { ServicioSolicitud } from './servicio-solicitud';

describe('ServicioSolicitud', () => {
  let service: ServicioSolicitud;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioSolicitud);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
