import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PoButtonModule, PoDialogModule, PoFieldModule, PoPageModule, PoWidgetModule } from '@po-ui/ng-components';
import { HttpCustomInterceptorModule } from '../../core/modules/http-custom-interceptor/http-custom-interceptor.module';
import { LoginGuard } from '../auth/guards/login.guard';
import { UsuarioNovoGuard } from './guards/usuario-novo.guard';
import { UsuarioNovoComponent } from './pages/usuario-novo/usuario-novo.component';
import { UsuarioPerfilComponent } from './pages/usuario-perfil/usuario-perfil.component';
import { UsuarioService } from './services/usuario.service';
import { UsuarioRoutingModule } from './usuario-routing.module';

@NgModule({
  declarations: [UsuarioNovoComponent, UsuarioPerfilComponent],
  imports: [
    CommonModule,
    HttpCustomInterceptorModule,
    UsuarioRoutingModule,
    ReactiveFormsModule,
    PoPageModule,
    PoButtonModule,
    PoFieldModule,
    PoDialogModule,
    PoWidgetModule
  ],
  providers: [UsuarioService, UsuarioNovoGuard, LoginGuard],
})
export class UsuarioModule {}
