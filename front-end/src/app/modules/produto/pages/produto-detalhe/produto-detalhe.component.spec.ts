import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { PRODUTO_MOCK } from '../../../../mocks/produto.mock';
import { ProdutoFormComponent } from '../../components/produto-form/produto-form.component';
import { ProdutoDetalheComponent } from './produto-detalhe.component';

describe('produto-detalhe.component.spec | ProdutoDetalheComponent', () => {
  let component: ProdutoDetalheComponent;
  let fixture: ComponentFixture<ProdutoDetalheComponent>;

  const activatedRoute = {
    snapshot: {
      data: {
        produto: PRODUTO_MOCK[0]
      }
    }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutoDetalheComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRoute
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve chamar método onSubmit() do component filho', () => {
    component.formComponent = new ProdutoFormComponent(null, null, null, null, null);
    spyOn(component.formComponent, 'onSubmit');

    const salvar = component.actionsPage.find(item => item.label === 'Salvar');
    salvar.action();

    expect(component.onSubmitForm).toBeTrue();
    expect(component.formComponent.onSubmit).toHaveBeenCalled();
  });

  it('Deve retornar true caso o form não estiver sujo e não foi submetido', () => {
    const retorno = component.canDeactivate();
    expect(retorno).toBeTrue();
  });
});
