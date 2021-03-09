import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { ExceptionService } from '../../../core/services/exception/exception.service';
import { HttpStatusCodeEnum } from '../../../shared/enums/http-status-code.enum';
import { Token } from '../models/auth-token.interface';
import { AuthService } from '../services/auth.service';
import { AuthLoginComponent } from './auth-login.component';

describe('auth-login.component.spec | AuthLoginComponent', () => {
  let component: AuthLoginComponent;
  let fixture: ComponentFixture<AuthLoginComponent>;
  let authService: AuthService;
  let exceptionService: ExceptionService;

  const token: Token = {
    accessToken: 'abc123'
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule],
        providers: [FormBuilder, AuthService, ExceptionService]
      }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    exceptionService = TestBed.inject(ExceptionService);
    authService = TestBed.inject(AuthService);
    authService.logout();
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
    expect(component.form.get('email').value).toBe('');
    expect(component.form.get('password').value).toBe('');
    expect(component.form.status).toBe('INVALID');
  });

  it('Deve fazer requisição ao backend ao chamar método onSubmit()', () => {
    const spyAuth = spyOn(authService, 'login').and.returnValue(of(token));
    component.onSubmit();
    expect(spyAuth).toHaveBeenCalled();
  });

  it('Deve tratar o erro caso ocorra ao chamar método onSubmit()', () => {
    spyOn(authService, 'login').and.returnValue(throwError(new HttpErrorResponse({
      status: HttpStatusCodeEnum.InternalServerError,
      statusText: 'Ocorreu um erro no servidor.'
    })));
    const spyException = spyOn(exceptionService, 'handleError');
    component.onSubmit();
    expect(spyException).toHaveBeenCalled();
  });

  it('Deve submeter o formulário ao pressionar a tecla Enter', () => {
    component.form.get('email').setValue('teste@teste.com');
    component.form.get('password').setValue('Teste@123');
    const spy = spyOn(component, 'onSubmit');
    const event = new KeyboardEvent('window:keyup', {
      key: 'Enter'
    });
    component.keyUp(event);
    expect(spy).toHaveBeenCalled();
  });
});
