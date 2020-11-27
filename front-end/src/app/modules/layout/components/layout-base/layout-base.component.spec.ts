import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PoAvatarModule, PoButtonModule, PoMenuModule } from '@po-ui/ng-components';
import { AuthService } from '../../../auth/services/auth.service';
import { FORNECEDOR_CONFIG } from '../../../fornecedor/fornecedor.config';
import { PRODUTO_CONFIG } from '../../../produto/produto.config';
import { LayoutBaseComponent } from './layout-base.component';

describe('layout-base.component.spec | LayoutBaseComponent', () => {
  let component: LayoutBaseComponent;
  let fixture: ComponentFixture<LayoutBaseComponent>;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutBaseComponent],
      imports: [
        RouterTestingModule,
        PoMenuModule,
        PoAvatarModule,
        PoButtonModule,
      ],
    });

    fixture = TestBed.createComponent(LayoutBaseComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve carregar a logo white', () => {
    expect(component.logo).toContain('white.svg');
  });

  it('Deve conter apenas 2 itens no menu caso usuário não estiver autenticado', () => {
    expect(component.menu).toBeTruthy();
    expect(component.menu.length).toBe(2);
    expect(component.menu[0].label).toBe('Home');
    expect(component.menu[0].link).toBe('/home');
    expect(component.menu[1].label).toBe(PRODUTO_CONFIG.namePlural);
    expect(component.menu[1].link).toBe(PRODUTO_CONFIG.pathFront);
  });

  it('Deve conter 3 itens no menu caso usuário estiver autenticado', () => {
    component.isLogged = true;
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
});
