import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutBaseComponent } from './modules/layout/components/layout-base/layout-base.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutBaseComponent,
    children: [
      {
        path: 'page',
        loadChildren: () => import('./modules/page/page.module').then(m => m.PageModule)
      },
      { path: '', redirectTo: 'page/home', pathMatch: 'full' },
      { path: '**', redirectTo: 'page/erro', pathMatch: 'full' }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
