import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { ExceptionService } from '../../../shared/services/exception/exception.service';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { Token } from '../models/auth-token.interface';
import { AuthService } from '../services/auth.service';
import { AuthLoginComponent } from './auth-login.component';

describe('auth-login.component.spec | AuthLoginComponent', () => {
  let component: AuthLoginComponent;
  let fixture: ComponentFixture<AuthLoginComponent>;
  let authService: AuthService;

  const notificationService = jasmine.createSpyObj<NotificationService>(['success', 'error']);

  const exceptionService = jasmine.createSpyObj<ExceptionService>(['handleError'])

  const token: Token = {
    accessToken: 'abc123'
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule],
        providers: [
          FormBuilder,
          {
            provide: NotificationService,
            useValue: notificationService
          },
          {
            provide: ExceptionService,
            useValue: exceptionService
          }
        ]
      });
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService);

    expect(component.form.get('email').setValue(null));
    expect(component.form.get('password').setValue(null));
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve ter como título da página o valor "Login"', () => {
    expect(component.pageTitle).toBe('Login');
  });

  it('Deve criar o breadcrumb corretamente', () => {
    expect(component.breadcrumb).toBeTruthy();
    expect(component.breadcrumb.items.length).toBe(2);
    expect(component.breadcrumb.items[0].label).toBe('Home');
    expect(component.breadcrumb.items[0].link).toBe('/');
    expect(component.breadcrumb.items[1].label).toBe('Login');
  });

  it('Deve criar o formulário corretamente', () => {
    expect(component.form).toBeTruthy();
    expect(component.form.status).toBe('INVALID');
  });

  it('Deve fazer requisição ao backend ao chamar método onSubmit()', () => {
    const spyAuth = spyOn(authService, 'login').and.returnValue(of(token));
    expect(component.form.get('email').setValue('teste@email.com'));
    expect(component.form.get('password').setValue('Teste@123'));
    component.onSubmit();
    expect(notificationService.success).toHaveBeenCalledWith('Olá, seja bem-vindo(a).');
    expect(spyAuth).toHaveBeenCalled();
  });

  it('Deve apresentar mensagem de erro e não deve fazer requisição ao backend caso formulário estiver inválido', () => {
    spyOn(authService, 'login');
    component.onSubmit();
    expect(notificationService.error).toHaveBeenCalledWith('Verifique o formulário.');
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('Deve tratar erro caso o ocorra ao fazer o login', () => {
    spyOn(authService, 'login').and.returnValue(throwError({status: 400}));
    expect(component.form.get('email').setValue('teste@email.com'));
    expect(component.form.get('password').setValue('Teste@123'));
    component.onSubmit();
    expect(exceptionService.handleError).toHaveBeenCalled();
  });
});
