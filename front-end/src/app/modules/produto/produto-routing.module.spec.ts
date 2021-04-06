import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './produto-routing.module';

describe('produto-routing.module.spec | ProdutoRoutingModule', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule
      ]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('Deve conter 1 rota', () => {
    expect(router.config.length).toBe(1);
  });

  it('Deve navegar para listagem de produtos', async () => {
    const url = await router.navigateByUrl('').then(() => location.path());
    expect(url).toBe('/');
  });
});
