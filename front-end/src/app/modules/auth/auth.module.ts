import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PoButtonModule, PoFieldModule, PoPageModule } from '@po-ui/ng-components';
import { HttpCustomInterceptorModule } from '../../core/modules/http-custom-interceptor/http-custom-interceptor.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthLoginComponent } from './pages/auth-login.component';

@NgModule({
  declarations: [AuthLoginComponent],
  imports: [
    HttpCustomInterceptorModule,
    CommonModule,
    AuthRoutingModule,
    PoButtonModule,
    PoPageModule,
    PoFieldModule,
    ReactiveFormsModule
  ]
})
export class AuthModule {}
