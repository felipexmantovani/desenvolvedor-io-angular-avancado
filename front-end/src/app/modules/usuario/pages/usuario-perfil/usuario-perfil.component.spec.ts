import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuarioPerfilComponent } from './usuario-perfil.component';

describe('usuario-perfil.component.spec | UsuarioPerfilComponent', () => {
  let component: UsuarioPerfilComponent;
  let fixture: ComponentFixture<UsuarioPerfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        UsuarioPerfilComponent
      ]
    });

    fixture = TestBed.createComponent(UsuarioPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });
});
