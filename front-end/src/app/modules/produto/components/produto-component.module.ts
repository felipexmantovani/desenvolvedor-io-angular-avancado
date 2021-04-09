import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PoDividerModule, PoFieldModule } from '@po-ui/ng-components';
import { FornecedorDirectiveModule } from '../../fornecedor/directives/fornecedor-directive.module';
import { ProdutoFormComponent } from './produto-form/produto-form.component';

@NgModule({
  declarations: [ProdutoFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PoFieldModule,
    PoDividerModule,
    FornecedorDirectiveModule
  ],
  exports: [ProdutoFormComponent]
})
export class ProdutoComponentModule {}
