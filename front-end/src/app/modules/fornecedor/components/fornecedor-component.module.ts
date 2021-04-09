import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PoButtonModule, PoDividerModule, PoFieldModule, PoModalModule } from '@po-ui/ng-components';
import { FornecedorFormComponent } from './fornecedor-form/fornecedor-form.component';

@NgModule({
  declarations: [FornecedorFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PoDividerModule,
    PoFieldModule,
    PoButtonModule,
    PoModalModule
  ],
  exports: [FornecedorFormComponent]
})
export class FornecedorComponentModule {}
