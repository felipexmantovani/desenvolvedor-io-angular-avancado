import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PoBreadcrumb, PoPageAction } from '@po-ui/ng-components';
import { CanDeactivatePage } from '../../../../shared/interfaces/can-deactivate-page.interface';
import { PageDefault } from '../../../../shared/interfaces/page-default.interface';
import { ProdutoFormComponent } from '../../components/produto-form/produto-form.component';
import { Produto } from '../../models/produto.interface';
import { PRODUTO_CONFIG } from '../../produto.config';

@Component({
  selector: 'app-produto-detalhe',
  templateUrl: './produto-detalhe.component.html'
})
export class ProdutoDetalheComponent implements OnInit, PageDefault, CanDeactivatePage {
  pageTitle = '';

  breadcrumb: PoBreadcrumb;

  actionsPage: Array<PoPageAction>;

  produto: Produto;

  @ViewChild('form', { static: true })
  formComponent: ProdutoFormComponent;

  onSubmitForm = false;

  canDeactivateTextModal = 'Realmente deseja sair desta página e cancelar a alteração do produto?';

  constructor(
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.produto = this.activatedRoute.snapshot.data['produto'];
    this.pageTitle = this.produto?.nome;

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

  onSubmit(): void {
    this.onSubmitForm = true;
    this.formComponent.onSubmit();
  }

  canDeactivate(): boolean {
    return !this.formComponent.form.dirty || this.onSubmitForm;
  }
}
