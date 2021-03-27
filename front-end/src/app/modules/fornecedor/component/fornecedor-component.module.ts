import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PoDividerModule, PoFieldModule } from '@po-ui/ng-components';
import { FornecedorFormComponent } from './fornecedor-form/fornecedor-form.component';

@NgModule({
  declarations: [FornecedorFormComponent],
  imports: [
    ReactiveFormsModule,
    PoDividerModule,
    PoFieldModule
  ],
  exports: [FornecedorFormComponent]
})
export class FornecedorComponentModule {}
