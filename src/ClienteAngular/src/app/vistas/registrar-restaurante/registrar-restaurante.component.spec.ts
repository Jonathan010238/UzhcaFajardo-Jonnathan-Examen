import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarRestauranteComponent } from './registrar-restaurante.component';

describe('RegistrarRestauranteComponent', () => {
  let component: RegistrarRestauranteComponent;
  let fixture: ComponentFixture<RegistrarRestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarRestauranteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
