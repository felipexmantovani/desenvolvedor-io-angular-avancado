import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../../../app.config';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { HttpHeadersEnum } from '../../../shared/enums/http-headers.enum';
import { MimeTypesEnum } from '../../../shared/enums/mime-types.enum';

@Injectable()
export class HttpCustomInterceptor implements HttpInterceptor {
  private httpHeaders = new HttpHeaders();

  private token: any;

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith(APP_CONFIG.apiV1, 0)) {
      this.httpHeaders = this.httpHeaders.set(HttpHeadersEnum.ContentType, MimeTypesEnum.Json);
      this.token = this.authService.getToken();
      if (this.token) {
        this.httpHeaders = this.httpHeaders.set(HttpHeadersEnum.Authorization, `Bearer ${this.token}`);
      }
      req = req.clone({headers: this.httpHeaders});
    }

    return next.handle(req);
  }
}
