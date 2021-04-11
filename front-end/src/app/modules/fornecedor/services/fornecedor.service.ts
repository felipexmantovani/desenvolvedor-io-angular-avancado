import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoComboFilter, PoComboOption } from '@po-ui/ng-components';
import { Observable, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { APP_CONFIG } from '../../../app.config';
import { CrudGenericService } from '../../../core/services/crud-generic/crud-generic.service';
import { ExceptionService } from '../../../core/services/exception/exception.service';
import { HttpUtil } from '../../../shared/utils/http.util';
import { FORNECEDOR_CONFIG } from '../fornecedor.config';
import { FornecedorEndereco } from '../models/fornecedor-endereco.interface';
import { Fornecedor } from '../models/fornecedor.interface';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService extends CrudGenericService<Fornecedor> implements PoComboFilter {
  static readonly API = `${APP_CONFIG.apiV1}${FORNECEDOR_CONFIG.pathApi}`;
  static readonly API_ENDERECO = `${APP_CONFIG.apiV1}${FORNECEDOR_CONFIG.pathApiEndereco}`;

  constructor(
    public httpClient: HttpClient,
    public exceptionService: ExceptionService
  ) {
    super(
      httpClient,
      exceptionService,
      FornecedorService.API
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

  getFilteredData(params: { property: string, value: string }, filterParams?: any): Observable<PoComboOption[]> {
    return this.read()
      .pipe(
        map(fornecedores => {
          const combo = new Array<PoComboOption>();
          fornecedores.forEach(fornecedor => {
            if (
              fornecedor.nome.toLocaleLowerCase().includes(params.value.toLocaleLowerCase()) ||
              params.value === ''
            ) {
              combo.push(this.convertCombo(fornecedor));
            }
          });
          return combo;
        })
      );
  }

  getObjectByValue(value: string, filterParams?: any): Observable<PoComboOption> {
    return this.readById(value).pipe(map(fornecedor => this.convertCombo(fornecedor)));
  }

  convertCombo(fornecedor: Fornecedor): PoComboOption {
    return {
      label: fornecedor.nome,
      value: fornecedor.id
    };
  }
}
