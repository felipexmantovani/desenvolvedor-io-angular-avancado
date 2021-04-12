import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { APP_CONFIG } from '../../../app.config';
import { ExceptionService } from '../../../shared/services/exception/exception.service';
import { HttpUtil } from '../../../shared/utils/http.util';
import { Token } from '../../auth/models/auth-token.interface';
import { Usuario } from '../models/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(
    private httpClient: HttpClient,
    private exceptionService: ExceptionService
  ) {}

  public novo(usuario: Usuario): Observable<Token> {
    return this.httpClient
      .post<Token>(`${APP_CONFIG.apiV1}/nova-conta`, usuario)
      .pipe(
        take(1),
        map((result) => HttpUtil.extractData(result)),
        catchError((error) => {
          this.exceptionService.handleError(error);
          return throwError(error);
        })
      );
  }
}
