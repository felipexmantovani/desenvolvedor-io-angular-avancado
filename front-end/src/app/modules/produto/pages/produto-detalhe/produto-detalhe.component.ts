import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PoBreadcrumb, PoPageAction } from '@po-ui/ng-components';
import { PageDefault } from '../../../../shared/interfaces/page-default.interface';
import { Produto } from '../../models/produto.interface';
import { PRODUTO_CONFIG } from '../../produto.config';

@Component({
  selector: 'app-produto-detalhe',
  templateUrl: './produto-detalhe.component.html'
})
export class ProdutoDetalheComponent implements OnInit, PageDefault {
  pageTitle = '';

  produto: Produto;

  breadcrumb: PoBreadcrumb;

  actionsPage: Array<PoPageAction>;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.produto = this.activatedRoute.snapshot.data['produto'];
    this.pageTitle = this.produto.nome;

    this.breadcrumb = {
      items: [
        { label: 'Home', link: '/' },
        { label: PRODUTO_CONFIG.namePlural, link: PRODUTO_CONFIG.pathFront },
        { label: this.pageTitle }
      ]
    };

    this.getActionsPage();
  }

  getActionsPage(): void {
    this.actionsPage = [
      { label: 'Salvar', action: () => this.onSubmit() },
      { label: 'Cancelar', url: `${PRODUTO_CONFIG.pathFront}` },
    ];
  }

  onSubmit(): void { }
}
