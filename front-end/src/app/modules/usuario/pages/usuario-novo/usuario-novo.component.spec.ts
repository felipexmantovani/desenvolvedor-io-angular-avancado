import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PoFieldModule } from '@po-ui/ng-components';
import { of } from 'rxjs';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { Token } from '../../../auth/models/auth-token.interface';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioNovoComponent } from './usuario-novo.component';

describe('usuario-novo.component.spec | UsuarioNovoComponent', () => {
  let component: UsuarioNovoComponent;
  let fixture: ComponentFixture<UsuarioNovoComponent>;
  let notificationService: jasmine.SpyObj<NotificationService>;
  let usuarioService: jasmine.SpyObj<UsuarioService>;

  notificationService = jasmine.createSpyObj<NotificationService>(['error', 'success']);

  usuarioService = jasmine.createSpyObj<UsuarioService>(['novo']);
  const token: Token = {
    accessToken: '123abc',
    userToken: {
      claims: {
        type: 'type',
        value: 'value'
      },
      email: 'teste@teste.com',
      id: '1'
    }
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UsuarioNovoComponent],
        imports: [
          HttpClientTestingModule,
          RouterTestingModule,
          PoFieldModule,
          ReactiveFormsModule,
        ],
        providers: [
          FormBuilder,
          {
            provide: UsuarioService,
            useValue: usuarioService
          },
          {
            provide: NotificationService,
            useValue: notificationService
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function pathFormValid(): void {
    component.form.get('email').setValue('teste@teste.com');
    component.form.get('password').setValue('Teste@123');
    component.form.get('confirmPassword').setValue('Teste@123');
  }

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve exibir notificação de erro caso passwords não forem iguais', () => {
    component.form.get('password').setValue('Teste@123');
    component.form.get('confirmPassword').setValue('123@Teste');
    component.onSubmit();
    expect(notificationService.error).toHaveBeenCalledWith('As senhas devem ser iguais.');
  });

  it('Deve cadastrar novo usuário exibir notificação de sucesso', () => {
    usuarioService.novo.and.returnValue(of(token));
    pathFormValid();
    component.onSubmit();
    expect(notificationService.success).toHaveBeenCalledWith(`${token.userToken.email} cadastrado com sucesso.`);
  });
});
