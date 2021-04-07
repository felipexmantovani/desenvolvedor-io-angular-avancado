import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FORNECEDOR_MOCK } from '../../../mocks/fornecedor.mock';
import { PRODUTO_MOCK } from '../../../mocks/produto.mock';
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

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PageHomeComponent],
        imports: [HttpClientTestingModule, RouterTestingModule],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: activatedRoute
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
});
