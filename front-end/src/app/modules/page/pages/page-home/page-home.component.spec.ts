import { HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PoChartModule, PoPageModule } from '@po-ui/ng-components';
import { APP_CONFIG } from '../../../../app.config';
import { FORNECEDOR_CONFIG } from '../../../fornecedor/fornecedor.config';
import { FORNECEDOR_MOCK } from '../../../fornecedor/mock/fornecedor.mock';
import { FornecedorService } from '../../../fornecedor/services/fornecedor.service';
import { PRODUTO_CONFIG } from '../../../produto/produto.config';
import { PageHomeComponent } from './page-home.component';

describe('page-home.component.spec | PageHomeComponent', () => {
  let component: PageHomeComponent;
  let fixture: ComponentFixture<PageHomeComponent>;
  let fornecedorService: FornecedorService;
  let httpTestingController: HttpTestingController;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PageHomeComponent],
        imports: [HttpClientTestingModule, RouterTestingModule, PoPageModule, PoChartModule],
        providers: [FornecedorService]
      });
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHomeComponent);
    component = fixture.componentInstance;
    fornecedorService = TestBed.inject(FornecedorService);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve montar o Chart após buscar os fornecedores', () => {
    httpTestingController.expectOne((req: HttpRequest<any>) => {
      return (
        req.url === `${APP_CONFIG.apiV1}${FORNECEDOR_CONFIG.pathApi}` &&
        req.method === 'GET'
      );
    })
    .flush(FORNECEDOR_MOCK);

    expect(component.series.length).toBe(2);
    expect(component.series[0].category).toBe(FORNECEDOR_CONFIG.namePlural);
    expect(component.series[0].value).toBe(5);
    expect(component.series[1].category).toBe(PRODUTO_CONFIG.namePlural);
    expect(component.series[1].value).toBe(1);
  });
});
