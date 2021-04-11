import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { PoDialogConfirmOptions, PoDialogService } from '@po-ui/ng-components';
import { FornecedorDetalheComponent } from '../pages/fornecedor-detalhe/fornecedor-detalhe.component';

@Injectable({
  providedIn: 'root'
})
export class FornecedorDetalheGuard implements CanDeactivate<FornecedorDetalheComponent> {
  constructor(public poDialogService: PoDialogService) {}

  async canDeactivate(component: FornecedorDetalheComponent): Promise<boolean> {
    return await this.verify(component);
  }

  private verify(component: FornecedorDetalheComponent): Promise<boolean> {
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
