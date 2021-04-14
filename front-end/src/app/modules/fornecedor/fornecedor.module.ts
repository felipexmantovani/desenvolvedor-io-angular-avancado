import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PoButtonModule, PoDividerModule, PoPageModule, PoTableModule, PoTabsModule, PoTagModule } from '@po-ui/ng-components';
import { PoPageDynamicSearchModule } from '@po-ui/ng-templates';
import { HttpCustomInterceptorModule } from '../../core/modules/http-custom-interceptor/http-custom-interceptor.module';
import { PipeModule } from '../../shared/modules/pipes/pipe.module';
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
    PoPageDynamicSearchModule,
    PoPageModule,
    PoButtonModule,
    PoTableModule,
    PoTagModule,
    PoDividerModule,
    PoTabsModule,
    ProdutoComponentModule,
    PipeModule
  ]
})
export class FornecedorModule {}
