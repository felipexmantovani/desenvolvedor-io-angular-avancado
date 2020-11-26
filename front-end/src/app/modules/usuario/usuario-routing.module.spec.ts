import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from '../auth/guards/auth.guard';
import { LoginGuard } from '../auth/guards/login.guard';
import { routes } from './usuario-routing.module';

describe('usuario-routing.module.spec | UsuarioRoutingModule', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule.withRoutes(routes)],
      providers: [AuthGuard, LoginGuard],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('Deve conter 2 rotas', () => {
    expect(router.config.length).toBe(2);
  });

  it('Deve navegar para /novo', async () => {
    const url = await router.navigateByUrl('/novo').then(() => location.path());
    expect(url).toBe('/novo');
  });
});
