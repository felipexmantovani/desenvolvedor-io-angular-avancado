import { Component, ViewChild } from '@angular/core';
import { PoBreadcrumb, PoPageAction } from '@po-ui/ng-components';
import { CanDeactivateForm } from '../../../../shared/interfaces/can-deactivate-form.interface';
import { PageDefault } from '../../../../shared/interfaces/page-default.interface';
import { FornecedorFormComponent } from '../../components/fornecedor-form/fornecedor-form.component';
import { FORNECEDOR_CONFIG } from '../../fornecedor.config';

@Component({
  selector: 'app-fornecedor-novo',
  templateUrl: './fornecedor-novo.component.html'
})
export class FornecedorNovoComponent implements PageDefault, CanDeactivateForm {
  pageTitle = `Novo ${FORNECEDOR_CONFIG.name}`;

  breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: FORNECEDOR_CONFIG.namePlural, link: FORNECEDOR_CONFIG.pathFront },
      { label: this.pageTitle }
    ]
  };

  @ViewChild('form', { static: true })
  formComponent: FornecedorFormComponent;

  actions: Array<PoPageAction> = [
    { label: 'Salvar', action: () => this.onSubmit() },
    { label: 'Cancelar', url: FORNECEDOR_CONFIG.pathFront },
  ];

  formClickSave = false;

  canDeactivateTextModal = 'Realmente deseja sair desta página e cancelar o cadastro do fornecedor?';

  constructor() {}

  onSubmit(): void {
    this.formClickSave = true;
    this.formComponent.onSubmit();
  }

  canDeactivate(): boolean {
    return !this.formComponent.form.dirty || this.formClickSave;
  }
}
