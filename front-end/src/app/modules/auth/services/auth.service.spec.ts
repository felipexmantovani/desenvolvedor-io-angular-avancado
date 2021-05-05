import { HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_CONFIG } from '../../../app.config';
import { StorageService } from '../../../shared/services/storage/storage.service';
import { Token } from '../models/auth-token.interface';
import { Login } from '../models/login.interface';
import { AuthService } from './auth.service';

describe('auth.service.spec | AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  const login: Login = {
    email: 'teste@teste.com',
    password: 'Teste@123'
  };

  const storageService = jasmine.createSpyObj<StorageService>(['localGetItem']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: StorageService,
          useValue: storageService
        }
      ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthService);
  });

  it('Deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('Deve retornar token e atualizar o BehaviorSubject após fazer login corretamente', () => {
    const data: any = {
      data: {
        accessToken: '123abc123abc123abc'
      }
    };

    const spy = spyOn(service.isLoggedBS, 'next');
    service.login(login).subscribe((tokenRes: Token) => {
      expect(tokenRes.accessToken).toBe('123abc123abc123abc');
      expect(spy).toHaveBeenCalled();
    });

    httpTestingController.expectOne((req: HttpRequest<any>) => {
      return (
        req.url === `${APP_CONFIG.apiV1}/entrar` &&
        req.method === 'POST' &&
        req.body === login
      );
    })
    .flush(data);
  });

  it('Deve retornar objeto vazio e atualizar o BehaviorSubject após fazer login incorretamente', () => {
    const data: any = {
      data: null
    };

    const spy = spyOn(service.isLoggedBS, 'next');
    service.login(login).subscribe((tokenRes: Token) => {
      expect(Object.keys(tokenRes).length).toBe(0);
      expect(spy).toHaveBeenCalled();
    });

    httpTestingController.expectOne((req: HttpRequest<any>) => {
      return (
        req.url === `${APP_CONFIG.apiV1}/entrar` &&
        req.method === 'POST' &&
        req.body === login
      );
    })
    .flush(data);
  });

  it('Deve chamar método do serviço de storage para obter o usuário', () => {
    service.getUser();
    expect(storageService.localGetItem).toHaveBeenCalled();
  });
});
