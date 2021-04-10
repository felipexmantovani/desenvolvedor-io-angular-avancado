import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoDialogConfirmOptions, PoDialogService, PoMenuItem } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
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
export class LayoutBaseComponent implements OnInit, OnDestroy {
  logo = './assets/logo/po_white.svg';

  maxShortLabel = 5;

  menu: Array<PoMenuItem>;

  isLogged = false;

  optionsDialog: PoDialogConfirmOptions;

  subs: Subscription = new Subscription();

  constructor(
    private router: Router,
    private authService: AuthService,
    private poDialogService: PoDialogService
  ) {}

  ngOnInit(): void {
    this.getMenu();

    this.subs.add(
      this.authService.isLoggedBS.subscribe(value => {
        this.isLogged = this.authService.isLogged() || value;
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getMenu(): void {
    this.menu = new Array<PoMenuItem>();

    this.menu.push(
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
      }
    );
  }

  goUsuario(): void {
    this.router.navigateByUrl(`${USUARIO_CONFIG.pathFront}/perfil`);
  }

  goLogin(): void {
    this.router.navigateByUrl(`${AUTH_CONFIG.pathFront}/login`);
  }

  goNewAccount(): void {
    this.router.navigateByUrl(`${USUARIO_CONFIG.pathFront}/novo`);
  }

  logout(): void {
    this.optionsDialog = {
      title: 'Confirmação!',
      message: 'Realmente deseja sair?',
      confirm: () => {
        this.authService.logout();
        this.router.navigateByUrl('/');
      }
    };
    this.poDialogService.confirm(this.optionsDialog);
  }
}
