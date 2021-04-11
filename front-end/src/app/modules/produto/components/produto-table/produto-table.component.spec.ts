import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PoDialogService } from '@po-ui/ng-components';
import { of } from 'rxjs';
import { PRODUTO_MOCK } from '../../../../mocks/produto.mock';
import { ProdutoService } from '../../services/produto.service';
import { ProdutoTableComponent } from './produto-table.component';

describe('produto-table.component.spec | ProdutoTableComponent', () => {
  let component: ProdutoTableComponent;
  let fixture: ComponentFixture<ProdutoTableComponent>;

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
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });
});
