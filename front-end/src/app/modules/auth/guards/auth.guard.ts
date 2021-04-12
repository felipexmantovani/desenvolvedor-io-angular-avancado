import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { APP_CONFIG } from '../../../app.config';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { StorageService } from '../../../shared/services/storage/storage.service';
import { AUTH_CONFIG } from '../auth.config';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private storageService: StorageService
  ) {}

  canLoad(): boolean {
    return this.canAccess();
  }

  canActivate(): boolean {
    return this.canAccess();
  }

  private canAccess(): boolean {
    if (!this.authService.isLogged()) {
      this.notificationService.warning('Para acessar essa página é necessário fazer o login.');
      this.router.navigate(
        [`${AUTH_CONFIG.pathFront}/login`],
        {
          queryParams: {
            redirectTo: this.storageService.localGetItem(APP_CONFIG.keyLastRoute)
          }
        });
      return false;
    }
    return true;
  }
}
