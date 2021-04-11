import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PoButtonModule, PoDividerModule, PoPageModule, PoTableModule, PoTabsModule, PoTagModule } from '@po-ui/ng-components';
import { HttpCustomInterceptorModule } from '../../core/modules/http-custom-interceptor/http-custom-interceptor.module';
import { ProdutoComponentModule } from '../produto/components/produto-component.module';
import { FornecedorComponentModule } from './components/fornecedor-component.module';
import { FornecedorRoutingModule } from './fornecedor-routing.module';
import { FornecedorDetalheComponent } from './pages/fornecedor-detalhe/fornecedor-detalhe.component';
import { FornecedorListarComponent } from './pages/fornecedor-listar/fornecedor-listar.component';
import { FornecedorNovoComponent } from './pages/fornecedor-novo/fornecedor-novo.component';

@NgModule({
  declarations: [
    FornecedorNovoComponent,
    FornecedorListarComponent,
    FornecedorDetalheComponent
  ],
  imports: [
    CommonModule,
    HttpCustomInterceptorModule,
    FornecedorRoutingModule,
    FornecedorComponentModule,
    PoPageModule,
    PoButtonModule,
    PoTableModule,
    PoTagModule,
    PoDividerModule,
    PoTabsModule,
    ProdutoComponentModule
  ]
})
export class FornecedorModule {}
