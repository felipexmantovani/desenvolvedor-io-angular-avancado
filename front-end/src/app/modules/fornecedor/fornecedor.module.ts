import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PoButtonModule, PoDividerModule, PoPageModule, PoTableModule, PoTagModule } from '@po-ui/ng-components';
import { HttpCustomInterceptorModule } from '../../core/modules/http-custom-interceptor/http-custom-interceptor.module';
import { FornecedorComponentModule } from './components/fornecedor-component.module';
import { FornecedorRoutingModule } from './fornecedor-routing.module';
import { FornecedorNovoGuard } from './guards/fornecedor-novo.guard';
import { FornecedorDetalheComponent } from './pages/fornecedor-detalhe/fornecedor-detalhe.component';
import { FornecedorListarComponent } from './pages/fornecedor-listar/fornecedor-listar.component';
import { FornecedorNovoComponent } from './pages/fornecedor-novo/fornecedor-novo.component';
import { FornecedorGetByIdResolver } from './resolvers/fornecedor-get-by-id.resolver';
import { FornecedorReadResolver } from './resolvers/fornecedor-read.resolver';
import { FornecedorService } from './services/fornecedor.service';

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
    PoDividerModule
  ],
  providers: [
    FornecedorNovoGuard,
    FornecedorService,
    FornecedorReadResolver,
    FornecedorGetByIdResolver
  ]
})
export class FornecedorModule {}
