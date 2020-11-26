import { NgModule } from '@angular/core';
import { PoPageModule, PoTabsModule } from '@po-ui/ng-components';
import { FornecedorRoutingModule } from './fornecedor-routing.module';
import { FornecedorNovoComponent } from './pages/fornecedor-novo/fornecedor-novo.component';

@NgModule({
  declarations: [FornecedorNovoComponent],
  imports: [FornecedorRoutingModule, PoTabsModule, PoPageModule],
})
export class FornecedorModule {}
