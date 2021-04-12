import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PoBreadcrumb, PoPageAction } from '@po-ui/ng-components';
import { CanDeactivateGuard } from '../../../../shared/interfaces/can-deactivate-form.interface';
import { PageDefault } from '../../../../shared/interfaces/page-default.interface';
import { FornecedorFormComponent } from '../../components/fornecedor-form/fornecedor-form.component';
import { FORNECEDOR_CONFIG } from '../../fornecedor.config';
import { Fornecedor } from '../../models/fornecedor.interface';

@Component({
  selector: 'app-fornecedor-detalhe',
  templateUrl: './fornecedor-detalhe.component.html'
})
export class FornecedorDetalheComponent implements OnInit, PageDefault, CanDeactivateGuard {
  pageTitle = '';

  breadcrumb: PoBreadcrumb;

  actionsPage: Array<PoPageAction>;

  fornecedor: Fornecedor;

  @ViewChild('form', { static: true })
  formComponent: FornecedorFormComponent;

  formSave = false;

  canDeactivateTextModal = 'Realmente deseja sair desta página e cancelar a alteração do fornecedor?';

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

    this.getActionsPage();
  }

  getActionsPage(): void {
    this.actionsPage = [
      { label: 'Salvar', action: () => this.onSubmit() },
      { label: 'Cancelar', url: `${FORNECEDOR_CONFIG.pathFront}` },
    ];
  }

  onSubmit(): void {
    this.formSave = true;
    this.formComponent.onSubmit();
  }

  canDeactivate(): boolean {
    return !this.formComponent.form.dirty || this.formSave;
  }
}
