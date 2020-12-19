import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NotificationService } from '../../../core/services/notification/notification.service';
import { routes } from '../auth-routing.module';
import { AUTH_CONFIG } from '../auth.config';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from './auth.guard';

describe('auth.guard.spec | AuthGuard', () => {
  let guard: AuthGuard;
  let service: AuthService;
  let router: Router;
  let notification: NotificationService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(routes)],
        providers: [AuthService],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    guard = TestBed.inject(AuthGuard);
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    notification = TestBed.inject(NotificationService);
    router.initialNavigation();
  });

  it('Deve ser criado', () => {
    expect(guard).toBeTruthy();
  });

  it('Deve retornar true caso o usuário estiver autenticado', () => {
    const spy = spyOn(service, 'isLogged').and.returnValue(true);
    guard.canLoad();
    expect(spy).toHaveBeenCalled();
    expect(guard.canLoad()).toBeTruthy();
  });

  it('Deve retornar false, exibir notificação e redirecionar para rota de login caso o usuário não estiver autenticado', () => {
    const spy = spyOn(service, 'isLogged').and.returnValue(false);
    const spyRouter = spyOn(router, 'navigateByUrl');
    const spyNotification = spyOn(notification, 'warning');
    guard.canLoad();
    expect(spy).toHaveBeenCalled();
    expect(guard.canLoad()).toBeFalsy();
    expect(spyRouter).toHaveBeenCalledWith(`${AUTH_CONFIG.pathFront}/login`);
    expect(spyNotification).toHaveBeenCalled();
  });
});
