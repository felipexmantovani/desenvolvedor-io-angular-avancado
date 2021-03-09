import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './produto-routing.module';

describe('produto-routing.module.spec | ProdutoRoutingModule', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)]
    });

    router = TestBed.inject(Router);
  });

  it('Deve conter 0 rotas', () => {
    expect(router.config.length).toBe(0);
  });
});
