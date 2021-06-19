import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PoDialogService } from '@po-ui/ng-components';
import { PRODUTO_MOCK } from '../../../../../../mocks/produto/produto.mock';
import { ProdutoTableComponent } from '../../components/produto-table/produto-table.component';
import { ProdutoListarComponent } from './produto-listar.component';

describe('produto-listar.component.spec | ProdutoListarComponent', () => {

  let component: ProdutoListarComponent;
  let fixture: ComponentFixture<ProdutoListarComponent>;

  const activatedRouteMock = {
    snapshot: {
      data: {
        fornecedor: PRODUTO_MOCK[1]
      }
    }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ProdutoListarComponent],
      providers: [
        PoDialogService,
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.table = new ProdutoTableComponent(null, null, null, null, null, null);
    component.table.produtosImmutable  = PRODUTO_MOCK;
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve popular produtos da grid ao executar método onQuickSearch() sem filtro', () => {
    component.onQuickSearch('');
    expect(component.table.produtos.length).toBe(7);
  });

  it('Deve filtrar produtos da grid', () => {
    component.onQuickSearch('CSS Total');
    expect(component.table.produtos.length).toBe(1);
  });

});
