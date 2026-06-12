import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSolicitud } from './list-solicitud';

describe('ListSolicitud', () => {
  let component: ListSolicitud;
  let fixture: ComponentFixture<ListSolicitud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSolicitud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSolicitud);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
