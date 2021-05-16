import { Component, ViewChild } from '@angular/core';
import { PoBreadcrumb, PoPageAction } from '@po-ui/ng-components';
import { CanDeactivatePage } from '../../../../shared/interfaces/can-deactivate-page.interface';
import { PageDefault } from '../../../../shared/interfaces/page-default.interface';
import { ProdutoFormComponent } from '../../components/produto-form/produto-form.component';
import { PRODUTO_CONFIG } from '../../produto.config';

@Component({
  selector: 'app-produto-novo',
  templateUrl: './produto-novo.component.html'
})
export class ProdutoNovoComponent implements PageDefault, CanDeactivatePage {

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
    { label: 'Salvar', action: () => this.onSubmit() },
    { label: 'Cancelar', url: PRODUTO_CONFIG.pathFront },
  ];

  onSubmitForm = false;

  canDeactivateTextModal = 'Realmente deseja sair desta página e cancelar o cadastro do produto?';

  constructor() {}

  onSubmit(): void {
    this.onSubmitForm = true;
    this.formComponent.onSubmit();
  }

  canDeactivate(): boolean {
    return !this.formComponent.form?.dirty || this.onSubmitForm;
  }

}
