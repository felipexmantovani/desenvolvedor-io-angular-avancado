import { HttpClient, HttpHandler, HttpRequest } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_CONFIG } from '../../../app.config';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { HttpHeadersEnum } from '../../../shared/enums/http-headers.enum';
import { MimeTypesEnum } from '../../../shared/enums/mime-types.enum';
import { HttpCustomInterceptor } from './http-custom-interceptor.service';

describe('http-custom-interceptor.service.spec | HttpCustomInterceptor', () => {
  let interceptor: HttpCustomInterceptor;
  let next: jasmine.SpyObj<HttpHandler>;
  let authService: AuthService;

  const req = new HttpRequest('GET', APP_CONFIG.apiV1);

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        providers: [
          AuthService,
          HttpHandler,
          HttpClient,
          HttpCustomInterceptor
        ],
      });
    })
  );

  beforeEach(() => {
    next = jasmine.createSpyObj(HttpHandler, ['handle']);
    interceptor = TestBed.inject(HttpCustomInterceptor);
    authService = TestBed.inject(AuthService);
  });

  it('Deve ser criado', () => {
    expect(interceptor).toBeTruthy();
  });

  it('Não deve conter o Authorization nos headers caso token seja inválido', () => {
    spyOn(authService, 'getToken').and.returnValue(null);
    interceptor.intercept(req, next);
    expect(interceptor['httpHeaders'].get(HttpHeadersEnum.ContentType)).toBe(MimeTypesEnum.Json);
    expect(interceptor['httpHeaders'].get(HttpHeadersEnum.Authorization)).toBeNull();
  });

  it('Deve conter o Authorization nos headers caso token seja válido', () => {
    spyOn(authService, 'getToken').and.returnValue('tokenValido');
    interceptor.intercept(req, next);
    expect(interceptor['httpHeaders'].get(HttpHeadersEnum.ContentType)).toBe(MimeTypesEnum.Json);
    expect(interceptor['httpHeaders'].get(HttpHeadersEnum.Authorization)).toBe('Bearer tokenValido');
  });

  it('Deve executar next.handle() no else', () => {
    interceptor.intercept(new HttpRequest('GET', 'http://teste'), next);
    expect(next.handle).toHaveBeenCalled();
  });
});
