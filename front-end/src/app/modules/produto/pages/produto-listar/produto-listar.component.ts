import { Component, ViewChild } from '@angular/core';
import { PoBreadcrumb, PoPageAction } from '@po-ui/ng-components';
import { PoPageDynamicSearchLiterals } from '@po-ui/ng-templates';
import { PageDefault } from '../../../../shared/interfaces/page-default.interface';
import { ProdutoTableComponent } from '../../components/produto-table/produto-table.component';
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

  literals: PoPageDynamicSearchLiterals = {
    searchPlaceholder: 'Pesquise pelo nome'
  };

  @ViewChild('table', { static: false })
  table: ProdutoTableComponent;

  constructor() {}

  onQuickSearch(filtro: string): void {
    filtro === '' ?
    this.onChangeDisclaimers() :
    this.table.produtos = this.table.produtosImmutable.filter(
      (produto) => produto.nome.toLowerCase().includes(filtro.toLowerCase())
    );
    this.table.setAtivosInativos();
  }

  onChangeDisclaimers(): void {
    this.table.produtos = this.table.produtosImmutable;
    this.table.setAtivosInativos();
  }
}
