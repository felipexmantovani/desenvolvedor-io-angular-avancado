import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { HttpUtil } from '../../utils/http.util';
import { ExceptionService } from '../exception/exception.service';

@Injectable({
  providedIn: 'root'
})
export class CrudGenericService<T> {
  constructor(
    protected httpClient: HttpClient,
    protected exceptionService: ExceptionService,
    @Inject(String)
    protected api: string
  ) {}

  create(type: T): Observable<T> {
    return this.httpClient
      .post<T>(this.api, type)
      .pipe(
        take(1),
        map((result) => HttpUtil.extractData(result)),
        catchError((error) => {
          this.exceptionService.handleError(error);
          return throwError(error);
        })
      );
  }

  read(): Observable<Array<T>> {
    return this.httpClient
      .get<Array<T>>(this.api)
      .pipe(
        take(1),
        catchError((error) => {
          this.exceptionService.handleError(error);
          return throwError(error);
        })
      );
  }

  readById(id: string): Observable<T> {
    return this.httpClient
      .get<T>(`${this.api}/${id}`)
      .pipe(
        take(1),
        catchError((error) => {
          this.exceptionService.handleError(error);
          return throwError(error);
        })
      );
  }

  update(type: T): Observable<T> {
    return this.httpClient
      .put<T>(`${this.api}/${type['id']}`, type)
      .pipe(
        take(1),
        map((result) => HttpUtil.extractData(result)),
        catchError((error) => {
          this.exceptionService.handleError(error);
          return throwError(error);
        })
      );
  }

  delete(id: string): Observable<T> {
    return this.httpClient
      .delete<T>(`${this.api}/${id}`)
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
