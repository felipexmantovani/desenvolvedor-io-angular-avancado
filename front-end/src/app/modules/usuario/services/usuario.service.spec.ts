import { HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_CONFIG } from '../../../app.config';
import { USUARIO_MOCK } from '../../../mocks/usuario.mock';
import { Token } from '../../auth/models/auth-token.interface';
import { UsuarioService } from './usuario.service';

describe('usuario.service.spec | UsuarioService', () => {
  let service: UsuarioService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UsuarioService);
  });

  it('Deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('Deve criar um usuário', () => {
    const token: Token = {
      accessToken: 'abc123'
    };

    service.novo(USUARIO_MOCK).subscribe(tokenRes => {
      expect(tokenRes.accessToken).toBe(token.accessToken);
    });

    httpTestingController.expectOne((req: HttpRequest<any>) => {
      return (
        req.url === `${APP_CONFIG.apiV1}/nova-conta` &&
        req.method === 'POST' &&
        req.body === USUARIO_MOCK
      );
    })
    .flush({data: token});
  });
});
