import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProdutoFormComponent } from '../../components/produto-form/produto-form.component';
import { PRODUTO_CONFIG } from '../../produto.config';
import { ProdutoNovoComponent } from './produto-novo.component';

describe('produto-novo.component.spec | ProdutoNovoComponent', () => {

  let component: ProdutoNovoComponent;
  let fixture: ComponentFixture<ProdutoNovoComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProdutoNovoComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve criar o título da página corretamente', () => {
    expect(component.pageTitle).toBe(`Novo ${PRODUTO_CONFIG.name}`);
  });

  it('Deve criar o breadcrumb corretamente', () => {
    expect(component.breadcrumb.items[0].label).toBe('Home');
    expect(component.breadcrumb.items[0].link).toBe('/');
    expect(component.breadcrumb.items[1].label).toBe(PRODUTO_CONFIG.namePlural);
    expect(component.breadcrumb.items[1].link).toBe(PRODUTO_CONFIG.pathFront);
    expect(component.breadcrumb.items[2].label).toBe(component.pageTitle);
  });

  it('Deve criar as actions corretamente', () => {
    expect(component.actions[0].label).toBe('Salvar');
    expect(component.actions[1].label).toBe('Cancelar');
    expect(component.actions[1].url).toBe(PRODUTO_CONFIG.pathFront);
  });

  it('Deve executar método onSubmit() do component filho ao clicar em salvar', () => {
    component.formComponent = new ProdutoFormComponent(null, null, null, null, null);
    spyOn(component.formComponent, 'onSubmit');

    const salvar = component.actions.find(item => item.label === 'Salvar');
    salvar.action();

    expect(component.formComponent.onSubmit).toHaveBeenCalled();
  });

  it('Deve retornar true caso o form não estiver sujo e não foi submetido', () => {
    const retorno = component.canDeactivate();
    expect(retorno).toBeTrue();
  });

});
