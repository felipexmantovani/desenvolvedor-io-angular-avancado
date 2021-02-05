import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PoButtonModule, PoFieldModule, PoPageModule } from '@po-ui/ng-components';
import { of, throwError } from 'rxjs';
import { ExceptionService } from '../../../../core/services/exception/exception.service';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { HttpStatusCodeEnum } from '../../../../shared/enums/http-status-code.enum';
import { Token } from '../../../auth/models/auth-token.interface';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioNovoComponent } from './usuario-novo.component';

describe('usuario-novo.component.spec | UsuarioNovoComponent', () => {
  let component: UsuarioNovoComponent;
  let fixture: ComponentFixture<UsuarioNovoComponent>;
  let notificationService: jasmine.SpyObj<NotificationService>;
  let usuarioService: jasmine.SpyObj<UsuarioService>;
  let exceptionService: jasmine.SpyObj<ExceptionService>;

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

  exceptionService = jasmine.createSpyObj<ExceptionService>(['handleError']);

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UsuarioNovoComponent],
        imports: [
          HttpClientTestingModule,
          RouterTestingModule,
          PoPageModule,
          PoFieldModule,
          PoButtonModule,
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
          },
          {
            provide: ExceptionService,
            useValue: exceptionService
          }
        ],
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

  it('Deve tratar erro ao cadastrar o usuário', () => {
    usuarioService.novo.and.returnValue(throwError(new HttpErrorResponse({
      status: HttpStatusCodeEnum.BadRequest,
      statusText: 'Erro no servidor'
    })));
    pathFormValid();
    component.onSubmit();
    expect(exceptionService.handleError).toHaveBeenCalled();
  });

  it('Deve submeter o formulário ao pressionar a tecla Enter', () => {
    pathFormValid();
    const spy = spyOn(component, 'onSubmit');
    const event = new KeyboardEvent('window:keyup', {
      key: 'Enter'
    });
    component.keyUp(event);
    expect(spy).toHaveBeenCalled();
  });
});
