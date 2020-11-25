import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { AuthLoginComponent } from './pages/auth-login.component';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [LoginGuard],
    component: AuthLoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class AuthRoutingModule {}
