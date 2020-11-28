import { HttpClientModule } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../auth-routing.module';
import { AuthService } from '../services/auth.service';
import { LoginGuard } from './login.guard';

describe('login.guard.spec | LoginGuard', () => {
  let guard: LoginGuard;
  let service: AuthService;
  let router: Router;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule, RouterTestingModule.withRoutes(routes)],
        providers: [AuthService, LoginGuard],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    guard = TestBed.inject(LoginGuard);
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    router.initialNavigation();
  });

  it('Deve ser criado', () => {
    expect(guard).toBeTruthy();
  });

  it('Deve retornar false e redirecionar para home caso o usuário estiver autenticado', () => {
    const spy = spyOn(service, 'isLogged').and.returnValue(true);
    const spyRouter = spyOn(router, 'navigateByUrl');
    guard.canActivate();
    expect(guard.canActivate()).toBeFalsy();
    expect(spy).toHaveBeenCalled();
    expect(spyRouter).toHaveBeenCalledWith('/home');
  });

  it('Deve retornar true caso o usuário estiver autenticado', () => {
    const spy = spyOn(service, 'isLogged').and.returnValue(false);
    guard.canActivate();
    expect(spy).toHaveBeenCalled();
    expect(guard.canActivate()).toBeTruthy();
  });
});
