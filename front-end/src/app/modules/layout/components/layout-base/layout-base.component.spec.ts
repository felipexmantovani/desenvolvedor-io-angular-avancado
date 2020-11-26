import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PoAvatarModule, PoButtonModule, PoMenuModule } from '@po-ui/ng-components';
import { LayoutBaseComponent } from './layout-base.component';

describe('layout-base.component.spec | LayoutBaseComponent', () => {
  let component: LayoutBaseComponent;
  let fixture: ComponentFixture<LayoutBaseComponent>;

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
    expect(component.menu[1].label).toBe('Produtos');
    expect(component.menu[1].link).toBe('/produto');
  });

  // to-do fazer caso de teste se usuário estiver logado carregar o item fornecedores
});
