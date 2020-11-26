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
  readonly logo = './assets/logo/po_white.svg';

  private maxShortLabel = 5;

  public menu: Array<PoMenuItem>;

  public isLogged = false;

  private subs: Array<Subscription> = new Array<Subscription>();

  constructor(
    private router: Router,
    private authService: AuthService,
    private poDialogService: PoDialogService
  ) {}

  ngOnInit(): void {
    this.subs.push(
      this.authService.isLoggedBS.subscribe(value => {
        this.isLogged = this.authService.isLogged() || value;
        this.getMenu();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  private getMenu(): void {
    this.menu = new Array<PoMenuItem>();

    this.menu.push({
      label: 'Home',
      link: '/home',
      icon: 'po-icon-home',
      shortLabel: StringUtil.resume('Home', this.maxShortLabel, true)
    });

    if (this.isLogged) {
      this.menu.push(
        {
          label: FORNECEDOR_CONFIG.namePlural,
          link: FORNECEDOR_CONFIG.pathFront,
          icon: 'po-icon-truck',
          shortLabel: StringUtil.resume(FORNECEDOR_CONFIG.namePlural, this.maxShortLabel, true)
        }
      );
    }

    this.menu.push({
      label: PRODUTO_CONFIG.namePlural,
      link: PRODUTO_CONFIG.pathFront,
      icon: 'po-icon-database',
      shortLabel: StringUtil.resume(PRODUTO_CONFIG.namePlural, this.maxShortLabel, true)
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
    const options: PoDialogConfirmOptions = {
      title: 'Confirmação!',
      message: 'Realmente deseja sair?',
      confirm: () => {
        this.authService.logout();
        this.router.navigateByUrl('/');
      }
    };
    this.poDialogService.confirm(options);
  }
}
