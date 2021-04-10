import { Component } from '@angular/core';
import { PoBreadcrumb, PoPageAction } from '@po-ui/ng-components';
import { PageDefault } from '../../../../shared/interfaces/page-default.interface';
import { PRODUTO_CONFIG } from '../../produto.config';

@Component({
  selector: 'app-produto-listar',
  templateUrl: './produto-listar.component.html'
})
export class ProdutoListarComponent implements PageDefault {
  pageTitle = PRODUTO_CONFIG.namePlural;

  breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: this.pageTitle }]
  };

  actionsPage: Array<PoPageAction> = [
    {
      label: `Novo ${PRODUTO_CONFIG.name}`,
      icon: 'po-icon-plus',
      url: `${PRODUTO_CONFIG.pathFront}/novo`
    }
  ];

  constructor() {}
}
