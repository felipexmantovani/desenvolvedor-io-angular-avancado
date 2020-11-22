import { Injectable } from '@angular/core';
import { PoNotification, PoNotificationService } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private poNotificationService: PoNotificationService) {}

  public error(value: string | PoNotification): void {
    this.poNotificationService.error(value);
  }

  public information(value: string | PoNotification): void {
    this.poNotificationService.information(value);
  }

  public success(value: string | PoNotification): void {
    this.poNotificationService.success(value);
  }

  public warning(value: string | PoNotification): void {
    this.poNotificationService.warning(value);
  }
}
