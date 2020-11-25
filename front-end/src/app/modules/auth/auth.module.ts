import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PoButtonModule, PoFieldModule, PoPageModule } from '@po-ui/ng-components';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginGuard } from './guards/login.guard';
import { AuthLoginComponent } from './pages/auth-login.component';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [AuthLoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    PoButtonModule,
    PoPageModule,
    PoFieldModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService, LoginGuard],
})
export class AuthModule {}
