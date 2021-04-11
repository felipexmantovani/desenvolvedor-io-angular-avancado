import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { APP_CONFIG } from '../../../app.config';
import { ExceptionService } from '../../../core/services/exception/exception.service';
import { HttpUtil } from '../../../shared/utils/http.util';
import { Produto } from '../models/produto.interface';
import { PRODUTO_CONFIG } from '../produto.config';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private API = `${APP_CONFIG.apiV1}${PRODUTO_CONFIG.pathApi}`;

  constructor(
    private httpClient: HttpClient,
    private exceptionService: ExceptionService
  ) {}

  public save(produto: Produto): Observable<Produto> {
    return this.httpClient
      .post<Produto>(this.API, produto)
      .pipe(
        take(1),
        map((result) => HttpUtil.extractData(result)),
        catchError((error) => {
          this.exceptionService.handleError(error);
          return throwError(error);
        })
      );
  }

  public read(): Observable<Array<Produto>> {
    return this.httpClient
      .get<Array<Produto>>(this.API)
      .pipe(
        take(1),
        catchError((error) => {
          this.exceptionService.handleError(error);
          return throwError(error);
        })
      );
  }

  public readById(id: string): Observable<Produto> {
    return this.httpClient
      .get<Produto>(`${this.API}/${id}`)
      .pipe(
        take(1),
        catchError((error) => {
          this.exceptionService.handleError(error);
          return throwError(error);
        })
      );
  }

  public update(produto: Produto): Observable<Produto> {
    return this.httpClient
      .put<Produto>(`${this.API}/${produto.id}`, produto)
      .pipe(
        take(1),
        map((result) => HttpUtil.extractData(result)),
        catchError((error) => {
          this.exceptionService.handleError(error);
          return throwError(error);
        })
      );
  }

  public delete(id: string): Observable<Produto> {
    return this.httpClient
      .delete<Produto>(`${this.API}/${id}`)
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
