import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { PoDialogConfirmOptions, PoDialogService } from '@po-ui/ng-components';
import { ProdutoDetalheComponent } from '../pages/produto-detalhe/produto-detalhe.component';

@Injectable({
  providedIn: 'root'
})
export class ProdutoDetalheGuard implements CanDeactivate<ProdutoDetalheComponent> {
  constructor(public poDialogService: PoDialogService) {}

  async canDeactivate(component: ProdutoDetalheComponent): Promise<boolean> {
    return await this.verify(component);
  }

  private verify(component: ProdutoDetalheComponent): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!component.formComponent.form.dirty || component.formSave) {
        resolve(true);
      } else {
        const options: PoDialogConfirmOptions = {
          title: 'Confirmação!',
          message: 'Realmente deseja sair desta página e cancelar as alterações?',
          confirm: () => {
            resolve(true);
          },
          cancel: () => {
            resolve(false);
          }
        };
        this.poDialogService.confirm(options);
      }
    });
  }
}
