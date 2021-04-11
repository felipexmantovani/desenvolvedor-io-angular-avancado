import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PoPageModule } from '@po-ui/ng-components';
import { HttpCustomInterceptorModule } from '../../core/modules/http-custom-interceptor/http-custom-interceptor.module';
import { ProdutoComponentModule } from './components/produto-component.module';
import { ProdutoDetalheComponent } from './pages/produto-detalhe/produto-detalhe.component';
import { ProdutoListarComponent } from './pages/produto-listar/produto-listar.component';
import { ProdutoNovoComponent } from './pages/produto-novo/produto-novo.component';
import { ProdutoRoutingModule } from './produto-routing.module';

@NgModule({
  declarations: [
    ProdutoListarComponent,
    ProdutoDetalheComponent,
    ProdutoNovoComponent
  ],
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    ProdutoComponentModule,
    HttpCustomInterceptorModule,
    PoPageModule
  ]
})
export class ProdutoModule {}
