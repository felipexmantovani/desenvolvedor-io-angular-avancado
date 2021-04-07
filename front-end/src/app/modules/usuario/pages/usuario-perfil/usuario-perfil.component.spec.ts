import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { USUARIO_CONFIG } from '../../usuario.config';
import { UsuarioPerfilComponent } from './usuario-perfil.component';

describe('usuario-perfil.component.spec | UsuarioPerfilComponent', () => {
  let component: UsuarioPerfilComponent;
  let fixture: ComponentFixture<UsuarioPerfilComponent>;

  const authService = jasmine.createSpyObj<AuthService>(['getUser']);
  authService.getUser.and.returnValue(of(null));

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioPerfilComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: AuthService,
          useValue: authService
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
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
