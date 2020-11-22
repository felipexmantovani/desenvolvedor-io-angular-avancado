import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FORNECEDOR_CONFIG } from './modules/fornecedor/fornecedor.config';
import { PRODUTO_CONFIG } from './modules/produto/produto.config';
import { USUARIO_CONFIG } from './modules/usuario/usuario.config';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/page/page.module').then(m => m.PageModule)
  },
  {
    path: FORNECEDOR_CONFIG.path,
    loadChildren: () => import('./modules/fornecedor/fornecedor.module').then(m => m.FornecedorModule)
  },
  {
    path: PRODUTO_CONFIG.path,
    loadChildren: () => import('./modules/produto/produto.module').then(m => m.ProdutoModule)
  },
  {
    path: USUARIO_CONFIG.path,
    loadChildren: () => import('./modules/usuario/usuario.module').then(m => m.UsuarioModule)
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/erro', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
