import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem } from '@po-ui/ng-components';
import { StringUtil } from '../../../../shared/utils/string.util';
import { AUTH_CONFIG } from '../../../auth/auth.config';
import { AuthService } from '../../../auth/services/auth.service';
import { FORNECEDOR_CONFIG } from '../../../fornecedor/fornecedor.config';
import { PRODUTO_CONFIG } from '../../../produto/produto.config';
import { USUARIO_CONFIG } from '../../../usuario/usuario.config';

@Component({
  selector: 'app-layout-base',
  templateUrl: './layout-base.component.html',
  styleUrls: ['./layout-base.component.scss'],
  providers: [AuthService]
})
export class LayoutBaseComponent implements OnInit {
  readonly logo = './assets/logo/po_white.svg';

  private maxShortLabel = 5;

  readonly menu: Array<PoMenuItem> = [
    {
      label: 'Home',
      link: '/home',
      icon: 'po-icon-home',
      shortLabel: StringUtil.resume('Home', this.maxShortLabel, true)
    },
    {
      label: FORNECEDOR_CONFIG.namePlural,
      link: FORNECEDOR_CONFIG.pathFront,
      icon: 'po-icon-truck',
      shortLabel: StringUtil.resume(FORNECEDOR_CONFIG.namePlural, this.maxShortLabel, true)
    },
    {
      label: PRODUTO_CONFIG.namePlural,
      link: PRODUTO_CONFIG.pathFront,
      icon: 'po-icon-database',
      shortLabel: StringUtil.resume(PRODUTO_CONFIG.namePlural, this.maxShortLabel, true)
    },
  ];

  public isLogged = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedBS.subscribe(value => {
      this.isLogged = this.authService.isLogged() || value;
    });
  }

  public goUsuario(): void {
    this.router.navigateByUrl(USUARIO_CONFIG.pathFront);
  }

  public goLogin(): void {
    this.router.navigateByUrl(`${AUTH_CONFIG.pathFront}/login`);
  }

  public goNewAccount(): void {
    this.router.navigateByUrl(`${USUARIO_CONFIG.pathFront}/novo`);
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
