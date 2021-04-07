import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PoButtonModule, PoDividerModule, PoFieldModule, PoModalModule } from '@po-ui/ng-components';
import { FornecedorFormComponent } from './fornecedor-form/fornecedor-form.component';
import { FornecedorSelectComponent } from './fornecedor-select/fornecedor-select.component';

@NgModule({
  declarations: [FornecedorFormComponent, FornecedorSelectComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PoDividerModule,
    PoFieldModule,
    PoButtonModule,
    PoModalModule
  ],
  exports: [FornecedorFormComponent, FornecedorSelectComponent]
})
export class FornecedorComponentModule {}
