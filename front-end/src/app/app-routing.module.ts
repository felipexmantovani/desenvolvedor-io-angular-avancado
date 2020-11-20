import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutBaseComponent } from './modules/layout/components/layout-base/layout-base.component';
import { PAGE_CONFIG } from './modules/page/page.config';

const routes: Routes = [
  {
    path: '',
    component: LayoutBaseComponent,
    children: [
      {
        path: PAGE_CONFIG.path,
        loadChildren: () => import('./modules/page/page.module').then(m => m.PageModule)
      },
      { path: '', redirectTo: `${PAGE_CONFIG.pathFront}/home`, pathMatch: 'full' },
      { path: '**', redirectTo: `${PAGE_CONFIG.pathFront}/erro`, pathMatch: 'full' }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
