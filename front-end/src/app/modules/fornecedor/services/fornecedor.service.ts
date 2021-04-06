import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { APP_CONFIG } from '../../../app.config';
import { ExceptionService } from '../../../core/services/exception/exception.service';
import { HttpUtil } from '../../../shared/utils/http.util';
import { FORNECEDOR_CONFIG } from '../fornecedor.config';
import { FornecedorEndereco } from '../models/fornecedor-endereco.interface';
import { Fornecedor } from '../models/fornecedor.interface';

@Injectable()
export class FornecedorService {
  static API = `${APP_CONFIG.apiV1}${FORNECEDOR_CONFIG.pathApi}`;
  static API_ENDERECO = `${APP_CONFIG.apiV1}${FORNECEDOR_CONFIG.pathApiEndereco}`;

  constructor(
    private httpClient: HttpClient,
    private exceptionService: ExceptionService
  ) {}

  save(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.httpClient
      .post<Fornecedor>(FornecedorService.API, fornecedor)
      .pipe(
        take(1),
        map((result) => HttpUtil.extractData(result)),
        catchError((error) => {
          this.exceptionService.handleError(error);
          return throwError(error);
        })
      );
  }

  read(): Observable<Array<Fornecedor>> {
    return this.httpClient
      .get<Array<Fornecedor>>(FornecedorService.API)
      .pipe(
        take(1),
        catchError((error) => {
          this.exceptionService.handleError(error);
          return throwError(error);
        })
      );
  }

  readById(id: string): Observable<Fornecedor> {
    return this.httpClient
      .get<Fornecedor>(`${FornecedorService.API}/${id}`)
      .pipe(
        take(1),
        catchError((error) => {
          this.exceptionService.handleError(error);
          return throwError(error);
        })
      );
  }

  update(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.httpClient
      .put<Fornecedor>(`${FornecedorService.API}/${fornecedor.id}`, fornecedor)
      .pipe(
        take(1),
        map((result) => HttpUtil.extractData(result)),
        catchError((error) => {
          this.exceptionService.handleError(error);
          return throwError(error);
        })
      );
  }

  delete(id: string): Observable<Fornecedor> {
    return this.httpClient
      .delete<Fornecedor>(`${FornecedorService.API}/${id}`)
      .pipe(
        take(1),
        map((result) => HttpUtil.extractData(result)),
        catchError((error) => {
          this.exceptionService.handleError(error);
          return throwError(error);
        })
      );
  }

  readEnderecoById(id: number): Observable<FornecedorEndereco> {
    return this.httpClient
      .get<FornecedorEndereco>(`${FornecedorService.API_ENDERECO}/${id}`)
      .pipe(
        take(1),
        map((result) => HttpUtil.extractData(result)),
        catchError((error) => {
          this.exceptionService.handleError(error);
          return throwError(error);
        })
      );
  }

  updateEndereco(endereco: FornecedorEndereco): Observable<FornecedorEndereco> {
    return this.httpClient
      .put<FornecedorEndereco>(`${FornecedorService.API_ENDERECO}/${endereco.id}`, endereco)
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
