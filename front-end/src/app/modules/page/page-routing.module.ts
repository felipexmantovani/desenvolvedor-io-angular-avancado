import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FornecedorReadResolver } from '../fornecedor/resolvers/fornecedor-read.resolver';
import { ProdutoReadResolver } from '../produto/resolvers/produto-read.resolver';
import { PageErroComponent } from './pages/page-erro/page-erro.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';

export const routes: Routes = [
  {
    path: 'home',
    component: PageHomeComponent,
    resolve: {
      fornecedores: FornecedorReadResolver,
      produtos: ProdutoReadResolver
    }
  },
  {
    path: 'erro',
    component: PageErroComponent
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PageHomeRoutingModule {}
