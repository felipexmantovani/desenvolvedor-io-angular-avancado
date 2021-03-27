import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { HttpStatusCodeEnum } from '../../../shared/enums/http-status-code.enum';
import { NotificationService } from '../notification/notification.service';
import { Erros, ExceptionService } from './exception.service';

describe('exception.service.spec | ExceptionService', () => {
  let notification: jasmine.SpyObj<NotificationService>;
  let exception: ExceptionService;

  const authService = jasmine.createSpyObj<AuthService>(['logout']);

  beforeEach(() => {
    notification = jasmine.createSpyObj(NotificationService, ['error']);
    exception = new ExceptionService(notification, authService);
  });

  it('Deve tratar o erro NotFound', () => {
    const httpErrorResponse = new HttpErrorResponse({
      status: HttpStatusCodeEnum.NotFound
    });
    exception.handleError(httpErrorResponse);
    expect(notification.error).toHaveBeenCalledWith(`#${httpErrorResponse.status} - Requisição não encontrada.`);
  });

  it('Deve tratar o erro InternalServerError', () => {
    const httpErrorResponse = new HttpErrorResponse({
      status: HttpStatusCodeEnum.InternalServerError
    });
    exception.handleError(httpErrorResponse);
    expect(notification.error).toHaveBeenCalledWith(`#${httpErrorResponse.status} - Ocorreu um erro interno no servidor.`);
  });

  it('Deve tratar o erro Unknown Error', () => {
    const httpErrorResponse = new HttpErrorResponse({
      status: 123,
      statusText: 'Unknown Error'
    });
    exception.handleError(httpErrorResponse);
    expect(notification.error).toHaveBeenCalledWith(`#${httpErrorResponse.status} - Ocorreu um erro desconhecido.`);
  });

  it('Deve tratar o erro Unauthorized', () => {
    const httpErrorResponseUnauthorized = new HttpErrorResponse({
      status: 401,
      statusText: 'Unauthorized'
    });
    exception.handleError(httpErrorResponseUnauthorized);
    expect(notification.error).toHaveBeenCalledWith(`#${httpErrorResponseUnauthorized.status} - Seu token expirou. Por favor, faça o login novamente.`);
  });

  it('Deve tratar o erro do array de erros', () => {
    const errors: Erros = {
      errors: ['Ocorreu um erro no sistema.']
    };
    const httpErrorResponse = new HttpErrorResponse({
      statusText: 'Erro intencional.',
      error: errors
    });
    exception.handleError(httpErrorResponse);
    expect(notification.error).toHaveBeenCalledWith('Ocorreu um erro no sistema.');
  });

  it('Deve tratar o erro do array de erros quando não tem valor', () => {
    const httpErrorResponse = new HttpErrorResponse({
      statusText: 'Erro intencional.',
      error: null
    });
    exception.handleError(httpErrorResponse);
    expect(notification.error).toHaveBeenCalledWith('O sistema encontra-se indisponível.');
  });

  it('Deve tratar um erro que não seja de HttpErrorResponse', () => {
    exception.handleError({
      status: 999
    });
    expect(notification.error).toHaveBeenCalledWith(`#999 - O sistema encontra-se indisponível.`);
  });
});
