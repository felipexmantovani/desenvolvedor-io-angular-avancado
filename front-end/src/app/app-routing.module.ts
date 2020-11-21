import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { USUARIO_CONFIG } from './modules/usuario/usuario.config';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/page/page.module').then(m => m.PageModule)
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
