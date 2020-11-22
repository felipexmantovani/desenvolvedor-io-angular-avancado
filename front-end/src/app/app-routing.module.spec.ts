import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app-routing.module';

describe('app-routing.module.spec | AppRoutingModule', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes)
      ]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
  });

  it('Deve conter 4 rotas', () => {
    expect(router.config.length).toBe(4);
  });

  it('Deve redirecionar para /home', async () => {
    const url = await router.navigateByUrl('').then(() => location.path());
    expect(url).toBe('/home');
  });

  it('Deve redirecionar para /erro', async () => {
    const url = await router.navigateByUrl('/rota-inexistente').then(() => location.path());
    expect(url).toBe('/erro');
  });

  it('Deve navegar para módulo de usuário', async () => {
    const url = await router.navigateByUrl('/usuario').then(() => location.path());
    expect(url).toBe('/usuario');
  });
});
