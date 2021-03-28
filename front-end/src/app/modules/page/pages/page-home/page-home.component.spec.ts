import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PoPageModule, PoWidgetModule } from '@po-ui/ng-components';
import { FornecedorService } from '../../../fornecedor/services/fornecedor.service';
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
        imports: [HttpClientTestingModule, RouterTestingModule, PoPageModule, PoWidgetModule],
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
});
