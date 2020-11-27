import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PoButtonModule, PoDividerModule, PoFieldModule, PoPageModule, PoTabsModule } from '@po-ui/ng-components';
import { FornecedorRoutingModule } from './fornecedor-routing.module';
import { FornecedorNovoComponent } from './pages/fornecedor-novo/fornecedor-novo.component';

@NgModule({
  declarations: [FornecedorNovoComponent],
  imports: [
    FornecedorRoutingModule,
    PoTabsModule,
    PoPageModule,
    PoTabsModule,
    ReactiveFormsModule,
    PoFieldModule,
    PoDividerModule,
    PoButtonModule
  ],
})
export class FornecedorModule {}
