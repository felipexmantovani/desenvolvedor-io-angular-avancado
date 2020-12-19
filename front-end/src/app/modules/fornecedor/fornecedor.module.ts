import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PoButtonModule, PoDividerModule, PoFieldModule, PoPageModule, PoTabsModule } from '@po-ui/ng-components';
import { HttpCustomInterceptorModule } from '../../core/modules/http-custom-interceptor/http-custom-interceptor.module';
import { FornecedorRoutingModule } from './fornecedor-routing.module';
import { FornecedorNovoGuard } from './guards/fornecedor-novo.guard';
import { FornecedorNovoComponent } from './pages/fornecedor-novo/fornecedor-novo.component';
import { FornecedorService } from './services/fornecedor.service';

@NgModule({
  declarations: [FornecedorNovoComponent],
  imports: [
    HttpCustomInterceptorModule,
    FornecedorRoutingModule,
    PoTabsModule,
    PoPageModule,
    PoTabsModule,
    ReactiveFormsModule,
    PoFieldModule,
    PoDividerModule,
    PoButtonModule
  ],
  providers: [FornecedorNovoGuard, FornecedorService]
})
export class FornecedorModule {}
