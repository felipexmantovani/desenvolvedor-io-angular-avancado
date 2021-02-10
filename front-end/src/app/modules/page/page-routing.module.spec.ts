import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './page-routing.module';

describe('page-routing.module.spec | PageRoutingModule', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(routes)]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('Deve conter 3 rotas', () => {
    expect(router.config.length).toBe(3);
  });

  it('Deve navegar para /home', async () => {
    const url1 = await router.navigateByUrl('').then(() => location.path());
    expect(url1).toBe('/home');

    const url2 = await router.navigateByUrl('home').then(() => location.path());
    expect(url2).toBe('/home');
  });

  it('Deve navegar para /erro', async () => {
    const url = await router.navigateByUrl('erro').then(() => location.path());
    expect(url).toBe('/erro');
  });
});
