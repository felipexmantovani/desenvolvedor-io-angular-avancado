import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PoBreadcrumb, PoPageAction } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { PageDefault } from '../../../../shared/interfaces/page-default.interface';
import { FornecedorFormComponent } from '../../components/fornecedor-form/fornecedor-form.component';
import { FORNECEDOR_CONFIG } from '../../fornecedor.config';
import { Fornecedor } from '../../models/fornecedor.interface';

@Component({
  selector: 'app-fornecedor-detalhe',
  templateUrl: './fornecedor-detalhe.component.html'
})
export class FornecedorDetalheComponent implements OnInit, AfterViewInit, OnDestroy, PageDefault {
  pageTitle = '';

  breadcrumb: PoBreadcrumb;

  actionsPage: Array<PoPageAction>;

  fornecedor: Fornecedor;

  @ViewChild('form', { static: true })
  formComponent: FornecedorFormComponent;

  subs = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fornecedor = this.activatedRoute.snapshot.data['fornecedor'];
    this.pageTitle = this.fornecedor?.nome;

    this.breadcrumb = {
      items: [
        { label: 'Home', link: '/' },
        { label: FORNECEDOR_CONFIG.namePlural, link: FORNECEDOR_CONFIG.pathFront },
        { label: this.pageTitle }
      ]
    };
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.subs.add(
      this.formComponent.form?.valueChanges.subscribe(() => {
        this.getActionsPage();
      })
    );
  }

  getActionsPage(): void {
    this.actionsPage = [
      { label: 'Salvar', action: () => this.onSubmit(), disabled: !this.formComponent.form.dirty },
      { label: 'Cancelar', url: `${FORNECEDOR_CONFIG.pathFront}` },
    ];
  }

  onSubmit(): void {
    this.formComponent.onSubmit();
  }
}
