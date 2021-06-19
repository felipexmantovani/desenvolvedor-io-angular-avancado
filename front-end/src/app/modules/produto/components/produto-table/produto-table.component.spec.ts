import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PoDialogService } from '@po-ui/ng-components';
import { of } from 'rxjs';
import { PRODUTO_MOCK } from '../../../../../../mocks/produto/produto.mock';
import { PRODUTO_CONFIG } from '../../produto.config';
import { ProdutoService } from '../../services/produto.service';
import { ProdutoTableComponent } from './produto-table.component';

describe('produto-table.component.spec | ProdutoTableComponent', () => {
  let component: ProdutoTableComponent;
  let fixture: ComponentFixture<ProdutoTableComponent>;
  let router: Router;

  const produtoService = jasmine.createSpyObj<ProdutoService>(['read', 'delete']);
  produtoService.read.and.returnValue(of(PRODUTO_MOCK));
  produtoService.delete.and.returnValue(of(PRODUTO_MOCK[0]));

  const activatedRoute = {
    snapshot: {
      data: {
        produtos: PRODUTO_MOCK
      }
    }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutoTableComponent],
      imports: [RouterTestingModule],
      providers: [
        PoDialogService,
        {
          provide: ActivatedRoute,
          useValue: activatedRoute
        },
        {
          provide: ProdutoService,
          useValue: produtoService
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve navegar para a página de detalhes do produto', () => {
    spyOn(router, 'navigateByUrl');
    component.detalhes(PRODUTO_MOCK[0]);
    expect(router.navigateByUrl).toHaveBeenCalledWith(`${PRODUTO_CONFIG.pathFront}/detalhe/${PRODUTO_MOCK[0].id}`);
  });

  it('Deve consumir serviço de exclusão de produto', () => {
    component.excluir(PRODUTO_MOCK[0]);
    component.optionsDialog.confirm();
    expect(produtoService.delete).toHaveBeenCalled();
    component.optionsDialog.cancel();
  });
});
