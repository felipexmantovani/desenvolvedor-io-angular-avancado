import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PoButtonModule, PoDividerModule, PoFieldModule, PoPageModule, PoTableModule, PoTabsModule } from '@po-ui/ng-components';
import { HttpCustomInterceptorModule } from '../../core/modules/http-custom-interceptor/http-custom-interceptor.module';
import { FornecedorRoutingModule } from './fornecedor-routing.module';
import { FornecedorNovoGuard } from './guards/fornecedor-novo.guard';
import { FornecedorGridComponent } from './pages/fornecedor-grid/fornecedor-grid.component';
import { FornecedorNovoComponent } from './pages/fornecedor-novo/fornecedor-novo.component';
import { FornecedorReadResolver } from './resolvers/fornecedor-read.resolver';
import { FornecedorService } from './services/fornecedor.service';

@NgModule({
  declarations: [FornecedorNovoComponent, FornecedorGridComponent],
  imports: [
    CommonModule,
    HttpCustomInterceptorModule,
    FornecedorRoutingModule,
    PoTabsModule,
    PoPageModule,
    PoTabsModule,
    ReactiveFormsModule,
    PoFieldModule,
    PoDividerModule,
    PoButtonModule,
    PoTableModule
  ],
  providers: [FornecedorNovoGuard, FornecedorService, FornecedorReadResolver]
})
export class FornecedorModule {}
