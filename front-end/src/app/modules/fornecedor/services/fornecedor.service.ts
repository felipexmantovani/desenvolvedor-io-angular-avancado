import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { APP_CONFIG } from '../../../app.config';
import { HttpUtil } from '../../../shared/utils/http.util';
import { FORNECEDOR_CONFIG } from '../fornecedor.config';
import { FornecedorEndereco } from '../models/fornecedor-endereco.interface';
import { Fornecedor } from '../models/fornecedor.interface';

@Injectable()
export class FornecedorService {
  private API = `${APP_CONFIG.apiV1}${FORNECEDOR_CONFIG.pathApi}`;
  private API_ENDERECO = `${APP_CONFIG.apiV1}${FORNECEDOR_CONFIG.pathApi}/endereco`;

  constructor(private httpClient: HttpClient) {}

  public save(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.httpClient
      .post<Fornecedor>(this.API, fornecedor)
      .pipe(
        take(1),
        map((result) => HttpUtil.extractData(result))
      );
  }

  public read(): Observable<Array<Fornecedor>> {
    return this.httpClient
      .get<Array<Fornecedor>>(this.API)
      .pipe(take(1));
  }

  public readById(id: number): Observable<Fornecedor> {
    return this.httpClient
      .get<Fornecedor>(`${this.API}/${id}`)
      .pipe(
        take(1),
        map((result) => HttpUtil.extractData(result))
      );
  }

  public update(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.httpClient
      .put<Fornecedor>(`${this.API}/${fornecedor.id}`, fornecedor)
      .pipe(
        take(1),
        map((result) => HttpUtil.extractData(result))
      );
  }

  public delete(id: number): Observable<Fornecedor> {
    return this.httpClient
      .delete<Fornecedor>(`${this.API}/${id}`)
      .pipe(
        take(1),
        map((result) => HttpUtil.extractData(result))
      );
  }

  public readEnderecoById(id: number): Observable<FornecedorEndereco> {
    return this.httpClient
      .get<FornecedorEndereco>(`${this.API_ENDERECO}/${id}`)
      .pipe(
        take(1),
        map((result) => HttpUtil.extractData(result))
      );
  }

  public updateEndereco(endereco: FornecedorEndereco, id: number): Observable<FornecedorEndereco> {
    return this.httpClient
      .put<FornecedorEndereco>(`${this.API_ENDERECO}/${endereco.id}`, endereco)
      .pipe(
        take(1),
        map((result) => HttpUtil.extractData(result))
      );
  }
}
