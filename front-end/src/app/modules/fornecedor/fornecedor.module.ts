import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PoButtonModule, PoPageModule, PoTableModule } from '@po-ui/ng-components';
import { HttpCustomInterceptorModule } from '../../core/modules/http-custom-interceptor/http-custom-interceptor.module';
import { FornecedorComponentModule } from './component/fornecedor-component.module';
import { FornecedorRoutingModule } from './fornecedor-routing.module';
import { FornecedorNovoGuard } from './guards/fornecedor-novo.guard';
import { FornecedorListarComponent } from './pages/fornecedor-listar/fornecedor-listar.component';
import { FornecedorNovoComponent } from './pages/fornecedor-novo/fornecedor-novo.component';
import { FornecedorReadResolver } from './resolvers/fornecedor-read.resolver';
import { FornecedorService } from './services/fornecedor.service';

@NgModule({
  declarations: [
    FornecedorNovoComponent,
    FornecedorListarComponent
  ],
  imports: [
    CommonModule,
    HttpCustomInterceptorModule,
    FornecedorRoutingModule,
    FornecedorComponentModule,
    PoPageModule,
    PoButtonModule,
    PoTableModule
  ],
  providers: [FornecedorNovoGuard, FornecedorService, FornecedorReadResolver]
})
export class FornecedorModule {}
