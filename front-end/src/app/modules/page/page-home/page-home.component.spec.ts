import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FORNECEDOR_MOCK } from '../../../mocks/fornecedor.mock';
import { PRODUTO_MOCK } from '../../../mocks/produto.mock';
import { AuthService } from '../../auth/services/auth.service';
import { PageHomeComponent } from './page-home.component';

describe('page-home.component.spec | PageHomeComponent', () => {
  let component: PageHomeComponent;
  let fixture: ComponentFixture<PageHomeComponent>;

  const activatedRoute = {
    snapshot: {
      data: {
        fornecedores: FORNECEDOR_MOCK,
        produtos: PRODUTO_MOCK
      }
    }
  };

  const authService = jasmine.createSpyObj<AuthService>(['isLogged']);

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PageHomeComponent],
        imports: [HttpClientTestingModule, RouterTestingModule],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: activatedRoute
          },
          {
            provide: AuthService,
            useValue: authService
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      });
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve criar o breadcrumb corretamente', () => {
    expect(component.breadcrumb).toBeTruthy();
    expect(component.breadcrumb.items[0].label).toBe('Home');
    expect(component.breadcrumb.items[0].link).toBe('/');
  });

  it('Deve popular as propriedades produtosAtivos e produtosInativos caso usuário estiver logado', () => {
    authService.isLogged.and.returnValue(true);
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.produtosAtivos.length).toBe(5);
    expect(component.produtosInativos.length).toBe(2);
  });
});
