import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_CONFIG } from '../../../app.config';
import { CrudGenericService } from '../../../shared/services/crud-generic/crud-generic.service';
import { ExceptionService } from '../../../shared/services/exception/exception.service';
import { Produto } from '../models/produto.interface';
import { PRODUTO_CONFIG } from '../produto.config';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends CrudGenericService<Produto> {
  static readonly API = `${APP_CONFIG.apiV1}${PRODUTO_CONFIG.pathApi}`;

  constructor(
    public httpClient: HttpClient,
    public exceptionService: ExceptionService
  ) {
    super(
      httpClient,
      exceptionService,
      ProdutoService.API
    );
  }
}
