import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ExceptionService } from './exception/exception.service';
import { HttpCustomInterceptor } from './http-custom-interceptor/http-custom-interceptor.service';
import { NotificationService } from './notification/notification.service';
import { StorageService } from './storage/storage.service';

@NgModule({
  providers: [
    NotificationService,
    ExceptionService,
    StorageService,
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: HttpCustomInterceptor,
    },
  ],
})
export class CoreServiceModule {}
