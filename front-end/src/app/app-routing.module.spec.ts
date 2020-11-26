import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app-routing.module';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { FORNECEDOR_CONFIG } from './modules/fornecedor/fornecedor.config';
import { PRODUTO_CONFIG } from './modules/produto/produto.config';
import { USUARIO_CONFIG } from './modules/usuario/usuario.config';

describe('app-routing.module.spec | AppRoutingModule', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [AuthGuard]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
  });

  it('Deve conter 3 rotas principais', () => {
    expect(router.config.length).toBe(3);
  });

  it('Deve conter 5 rotas filhas carregadas no componente LayoutBaseComponent', () => {
    expect(router.config[0].children.length).toBe(5);
  });

  it('Deve redirecionar para /home', async () => {
    const url = await router.navigateByUrl('').then(() => location.path());
    expect(url).toBe('/home');
  });

  it('Deve redirecionar para /erro', async () => {
    const url = await router.navigateByUrl('/rota-inexistente').then(() => location.path());
    expect(url).toBe('/erro');
  });

  // to-do criar spy para o guarda de rotas AuthGuard
  // it('Deve navegar para módulo de fornecedor', async () => {
  //   const url = await router.navigateByUrl(FORNECEDOR_CONFIG.path).then(() => location.path());
  //   expect(url).toBe(FORNECEDOR_CONFIG.pathFront);
  // });

  it('Deve navegar para módulo de produto', async () => {
    const url = await router.navigateByUrl(PRODUTO_CONFIG.path).then(() => location.path());
    expect(url).toBe(PRODUTO_CONFIG.pathFront);
  });

  it('Deve navegar para módulo de usuário', async () => {
    const url = await router.navigateByUrl(USUARIO_CONFIG.path).then(() => location.path());
    expect(url).toBe(USUARIO_CONFIG.pathFront);
  });
});
