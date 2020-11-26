import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AUTH_CONFIG } from './modules/auth/auth.config';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { FORNECEDOR_CONFIG } from './modules/fornecedor/fornecedor.config';
import { LayoutBaseComponent } from './modules/layout/components/layout-base/layout-base.component';
import { PRODUTO_CONFIG } from './modules/produto/produto.config';
import { USUARIO_CONFIG } from './modules/usuario/usuario.config';

export const routes: Routes = [
  {
    path: '',
    component: LayoutBaseComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/page/page.module').then(m => m.PageModule)
      },
      {
        path: AUTH_CONFIG.path,
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: FORNECEDOR_CONFIG.path,
        canLoad: [AuthGuard],
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
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/erro', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
