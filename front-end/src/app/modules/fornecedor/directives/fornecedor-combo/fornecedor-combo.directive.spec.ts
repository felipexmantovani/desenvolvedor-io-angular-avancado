import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgControl } from '@angular/forms';
import { PoComboComponent } from '@po-ui/ng-components';
import { FornecedorService } from '../../services/fornecedor.service';
import { FornecedorComboDirective } from './fornecedor-combo.directive';

describe('fornecedor-combo.directive.spec | FornecedorComboDirective', () => {
  let directive: FornecedorComboDirective;
  let poComboComponent: PoComboComponent;
  let fixture: ComponentFixture<PoComboComponent>;

  const fornecedorService = jasmine.createSpyObj<FornecedorService>(['getFilteredData', 'getObjectByValue']);

  const ngControl = jasmine.createSpyObj<NgControl>(['control']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FornecedorComboDirective
      ],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: FornecedorService,
          useValue: fornecedorService
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    directive = new FornecedorComboDirective(null, null, null);
    fixture = TestBed.createComponent(PoComboComponent);
    poComboComponent = fixture.componentInstance;
    directive['host'] = [poComboComponent];
    directive['ngControl'] = ngControl;
  });

  it('Deve ser criado', () => {
    directive.ngOnInit();
    directive.combo.filterService = fornecedorService;
    expect(directive).toBeTruthy();
  });
});
