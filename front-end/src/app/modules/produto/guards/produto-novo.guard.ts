import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { PoDialogConfirmOptions, PoDialogService } from '@po-ui/ng-components';
import { ProdutoNovoComponent } from '../pages/produto-novo/produto-novo.component';

@Injectable({
  providedIn: 'root'
})
export class ProdutoNovoGuard implements CanDeactivate<ProdutoNovoComponent> {
  constructor(public poDialogService: PoDialogService) {}

  async canDeactivate(component: ProdutoNovoComponent): Promise<boolean> {
    return await this.verify(component);
  }

  private verify(component: ProdutoNovoComponent): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!component.formComponent.form.dirty || component.formComponent.produto?.id) {
        resolve(true);
      } else {
        const options: PoDialogConfirmOptions = {
          title: 'Confirmação!',
          message: 'Realmente deseja sair desta página e cancelar o cadastro?',
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
