import { Component } from '@angular/core';
import { PoBreadcrumb, PoPageAction } from '@po-ui/ng-components';
import { PageDefault } from '../../../../shared/interfaces/page-default.interface';
import { PRODUTO_CONFIG } from '../../produto.config';

@Component({
  selector: 'app-produto-novo',
  templateUrl: './produto-novo.component.html'
})
export class ProdutoNovoComponent implements PageDefault {
  public pageTitle = `Novo ${PRODUTO_CONFIG.name}`;

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: PRODUTO_CONFIG.namePlural, link: PRODUTO_CONFIG.pathFront },
      { label: this.pageTitle }
    ]
  };

  public actions: Array<PoPageAction> = [
    { label: 'Salvar', action: () => undefined },
    { label: 'Cancelar', url: PRODUTO_CONFIG.pathFront },
  ];

  constructor() {}
}
