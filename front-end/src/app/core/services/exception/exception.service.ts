import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { HttpStatusCodeEnum } from '../../../shared/enums/http-status-code.enum';
import { NotificationService } from '../notification/notification.service';

interface Erros {
  errors: Array<string>;
}

@Injectable({
  providedIn: 'root'
})
export class ExceptionService implements ErrorHandler {
  constructor(private notificationService: NotificationService) {}

  handleError(response: any): void {
    console.log('ExceptionService');
    console.log(response);

    if (response instanceof HttpErrorResponse) {
      if (response.status === HttpStatusCodeEnum.NotFound) {
        this.notificationService.error('Requisição não encontrada.');
        return;
      }

      if (response.status === HttpStatusCodeEnum.InternalServerError) {
        this.notificationService.error('Ocorreu um erro interno no servidor.');
        return;
      }

      if (response.statusText === 'Unknown Error') {
        this.notificationService.error('Ocorreu um erro desconhecido.');
        return;
      }

      if (response.error) {
        (response.error as Erros).errors.forEach(item => {
          this.notificationService.error(item);
        });
      }
    } else {
      this.notificationService.error('O sistema encontra-se indisponível.');
    }
  }
}
