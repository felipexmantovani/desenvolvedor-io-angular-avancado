import { Component, ViewChild } from '@angular/core';
import { PoBreadcrumb, PoPageAction } from '@po-ui/ng-components';
import { PageDefault } from '../../../../shared/interfaces/page-default.interface';
import { FornecedorFormComponent } from '../../components/fornecedor-form/fornecedor-form.component';
import { FORNECEDOR_CONFIG } from '../../fornecedor.config';

@Component({
  selector: 'app-fornecedor-novo',
  templateUrl: './fornecedor-novo.component.html'
})
export class FornecedorNovoComponent implements PageDefault {
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
    { label: 'Salvar', action: () => this.formComponent.onSubmit() },
    { label: 'Cancelar', url: FORNECEDOR_CONFIG.pathFront },
  ];

  constructor() {}
}
