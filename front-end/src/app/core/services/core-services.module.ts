import { NgModule } from '@angular/core';
import { ExceptionService } from './exception/exception.service';
import { NotificationService } from './notification/notification.service';
import { StorageService } from './storage/storage.service';

@NgModule({
  providers: [
    NotificationService,
    ExceptionService,
    StorageService
  ],
})
export class CoreServiceModule {}
