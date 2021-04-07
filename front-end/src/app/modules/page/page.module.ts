import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PoPageModule, PoWidgetModule } from '@po-ui/ng-components';
import { HttpCustomInterceptorModule } from '../../core/modules/http-custom-interceptor/http-custom-interceptor.module';
import { FornecedorReadResolver } from '../fornecedor/resolvers/fornecedor-read.resolver';
import { FornecedorService } from '../fornecedor/services/fornecedor.service';
import { ProdutoReadResolver } from '../produto/resolvers/produto-read.resolver';
import { ProdutoService } from '../produto/services/produto.service';
import { PageHomeRoutingModule } from './page-routing.module';
import { PageErroComponent } from './page-erro/page-erro.component';
import { PageHomeComponent } from './page-home/page-home.component';

@NgModule({
  declarations: [PageHomeComponent, PageErroComponent],
  imports: [CommonModule, PageHomeRoutingModule, PoPageModule, PoWidgetModule, HttpCustomInterceptorModule],
  providers: [FornecedorService, FornecedorReadResolver, ProdutoService, ProdutoReadResolver]
})
export class PageModule {}
