import { NgModule } from '@angular/core';
import { FornecedorService } from '../services/fornecedor.service';
import { FornecedorComboDirective } from './fornecedor-combo/fornecedor-combo.directive';

@NgModule({
  declarations: [FornecedorComboDirective],
  exports: [FornecedorComboDirective],
  providers: [FornecedorService]
})
export class FornecedorDirectiveModule {}
