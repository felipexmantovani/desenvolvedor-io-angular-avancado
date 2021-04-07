import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PoDialogService } from '@po-ui/ng-components';
import { AUTH_CONFIG } from '../../../auth/auth.config';
import { FORNECEDOR_CONFIG } from '../../../fornecedor/fornecedor.config';
import { PRODUTO_CONFIG } from '../../../produto/produto.config';
import { USUARIO_CONFIG } from '../../../usuario/usuario.config';
import { LayoutBaseComponent } from './layout-base.component';

describe('layout-base.component.spec | LayoutBaseComponent', () => {
  let component: LayoutBaseComponent;
  let fixture: ComponentFixture<LayoutBaseComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutBaseComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [PoDialogService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(LayoutBaseComponent);
    component = fixture.componentInstance;
    router =  TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve carregar a logo white', () => {
    expect(component.logo).toContain('white.svg');
  });

  it('Deve conter 3 itens no menu', () => {
    component['getMenu']();
    expect(component.menu).toBeTruthy();
    expect(component.menu.length).toBe(3);
    expect(component.menu[0].label).toBe('Home');
    expect(component.menu[0].link).toBe('/home');
    expect(component.menu[1].label).toBe(FORNECEDOR_CONFIG.namePlural);
    expect(component.menu[1].link).toBe(FORNECEDOR_CONFIG.pathFront);
    expect(component.menu[2].label).toBe(PRODUTO_CONFIG.namePlural);
    expect(component.menu[2].link).toBe(PRODUTO_CONFIG.pathFront);
  });

  it('Deve navegar rota de perfil de usuário', () => {
    const spy = spyOn(router, 'navigateByUrl');
    component.goUsuario();
    expect(spy).toHaveBeenCalledWith(`${USUARIO_CONFIG.pathFront}/perfil`);
  });

  it('Deve navegar rota de login', () => {
    const spy = spyOn(router, 'navigateByUrl');
    component.goLogin();
    expect(spy).toHaveBeenCalledWith(`${AUTH_CONFIG.pathFront}/login`);
  });

  it('Deve navegar rota de nova conta de usuário', () => {
    const spy = spyOn(router, 'navigateByUrl');
    component.goNewAccount();
    expect(spy).toHaveBeenCalledWith(`${USUARIO_CONFIG.pathFront}/novo`);
  });

  it('Deve navegar para raiz após fazer o logout', () => {
    spyOn(router, 'navigateByUrl');
    spyOn(component['poDialogService'], 'confirm');

    component.logout();
    component['optionsDialog'].confirm();

    expect(component['poDialogService'].confirm).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });
});
