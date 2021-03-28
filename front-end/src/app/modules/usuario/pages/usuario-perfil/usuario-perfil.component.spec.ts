import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PoPageModule } from '@po-ui/ng-components';
import { USUARIO_CONFIG } from '../../usuario.config';
import { UsuarioPerfilComponent } from './usuario-perfil.component';

describe('usuario-perfil.component.spec | UsuarioPerfilComponent', () => {
  let component: UsuarioPerfilComponent;
  let fixture: ComponentFixture<UsuarioPerfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioPerfilComponent],
      imports: [RouterTestingModule, PoPageModule],
    });

    fixture = TestBed.createComponent(UsuarioPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve criar o breadcrumb corretamente', () => {
    expect(component.breadcrumb).toBeTruthy();
    expect(component.breadcrumb.items[0].label).toBe('Home');
    expect(component.breadcrumb.items[0].link).toBe('/');
    expect(component.breadcrumb.items[1].label).toBe(USUARIO_CONFIG.name);
    expect(component.breadcrumb.items[2].label).toBe(component.pageTitle);
  });
});
