import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginComponent } from './pages/auth-login.component';

const routes: Routes = [
  {
    path: 'login',
    component: AuthLoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AuthRoutingModule {}
