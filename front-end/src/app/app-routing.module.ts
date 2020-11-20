import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutBaseComponent } from './modules/layout/components/layout-base/layout-base.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutBaseComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./modules/page/page.module').then(m => m.PageModule)
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
