import { Component, OnInit } from '@angular/core';
import { PoBreadcrumb } from '@po-ui/ng-components';
import { PageDefault } from '../../../../shared/interfaces/page-default.interface';
import { UserToken } from '../../../auth/models/auth-token.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { USUARIO_CONFIG } from '../../usuario.config';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html'
})
export class UsuarioPerfilComponent implements OnInit, PageDefault {
  pageTitle = 'Meu perfil';

  breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: USUARIO_CONFIG.name },
      { label: this.pageTitle }
    ]
  };

  usuarioStorage: UserToken;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.usuarioStorage = this.authService.getUser();
  }
}
