import { Component, ViewChild } from '@angular/core';
import { PoBreadcrumb, PoPageAction } from '@po-ui/ng-components';
import { CanDeactivateGuard } from '../../../../core/guards/can-deactivate-form/can-deactivate-form.interface';
import { PageDefault } from '../../../../shared/interfaces/page-default.interface';
import { ProdutoFormComponent } from '../../components/produto-form/produto-form.component';
import { PRODUTO_CONFIG } from '../../produto.config';

@Component({
  selector: 'app-produto-novo',
  templateUrl: './produto-novo.component.html'
})
export class ProdutoNovoComponent implements PageDefault, CanDeactivateGuard {
  pageTitle = `Novo ${PRODUTO_CONFIG.name}`;

  breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: PRODUTO_CONFIG.namePlural, link: PRODUTO_CONFIG.pathFront },
      { label: this.pageTitle }
    ]
  };

  @ViewChild('form', { static: true })
  formComponent: ProdutoFormComponent;

  actions: Array<PoPageAction> = [
    { label: 'Salvar', action: () => this.formComponent.onSubmit() },
    { label: 'Cancelar', url: PRODUTO_CONFIG.pathFront },
  ];

  canDeactivateTextModal = 'Realmente deseja sair desta página e cancelar o cadastro do produto?';

  constructor() {}

  canDeactivate(): boolean {
    return !this.formComponent.form.dirty;
  }
}
