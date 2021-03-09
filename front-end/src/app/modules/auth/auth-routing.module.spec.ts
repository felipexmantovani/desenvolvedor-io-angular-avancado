import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './auth-routing.module';
import { LoginGuard } from './guards/login.guard';

describe('auth-routing.module.spec | AuthRoutingModule', () => {
  let router: Router;
  let location: Location;

  const loginGuard = jasmine.createSpyObj<LoginGuard>(['canActivate']);
  loginGuard.canActivate.and.returnValue(true);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [
        {
          provide: LoginGuard,
          useValue: loginGuard,
        },
      ],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('Deve conter 1 rota', () => {
    expect(router.config.length).toBe(1);
  });

  it('Deve navegar para /login', async () => {
    const url = await router.navigateByUrl('/login').then(() => location.path());
    expect(url).toBe('/login');
  });
});
