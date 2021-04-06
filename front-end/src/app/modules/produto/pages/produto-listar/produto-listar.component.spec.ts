import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PoDialogService } from '@po-ui/ng-components';
import { PRODUTO_MOCK } from '../../../../mocks/produto.mock';
import { ProdutoService } from '../../services/produto.service';
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
        ProdutoService,
        PoDialogService,
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });
});
