import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { NotificationService } from '../../../core/services/notification/notification.service';
import { AUTH_CONFIG } from '../auth.config';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  canLoad(): boolean {
    if (!this.authService.isLogged()) {
      this.notificationService.warning('Para acessar essa página é preciso fazer o login.');
      this.router.navigateByUrl(`${AUTH_CONFIG.pathFront}/login`);
      return false;
    }
    return true;
  }
}
