import { Component, OnInit } from '@angular/core';
import { PoBreadcrumb } from '@po-ui/ng-components';
import { PageDefault } from '../../../../shared/interfaces/page-default.interface';
import { FORNECEDOR_CONFIG } from '../../fornecedor.config';

@Component({
  selector: 'app-fornecedor-novo',
  templateUrl: './fornecedor-novo.component.html'
})
export class FornecedorNovoComponent implements OnInit, PageDefault {
  public pageTitle = `Novo ${FORNECEDOR_CONFIG.name}`;

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: this.pageTitle }]
  };

  constructor() {}

  ngOnInit(): void {
  }
}
