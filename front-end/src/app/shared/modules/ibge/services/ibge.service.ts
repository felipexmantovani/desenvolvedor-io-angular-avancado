import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { ExceptionService } from '../../../services/exception/exception.service';
import { StringUtil } from '../../../utils/string.util';
import { IbgeMunicipio } from '../models/municipio.interface';
import { IbgeUf } from '../models/uf.interface';

@Injectable({
  providedIn: 'root',
})
export class IbgeService {
  static API = 'https://servicodados.ibge.gov.br/api/v1/localidades';
  static API_ESTADOS = `${IbgeService.API}/estados`;
  static API_MUNICIPIOS = `${IbgeService.API}/municipios`;

  constructor(
    private httpClient: HttpClient,
    private exceptionService: ExceptionService
  ) {}

  getEstados(): Observable<Array<IbgeUf>> {
    return this.httpClient.get<Array<IbgeUf>>(IbgeService.API_ESTADOS).pipe(
      take(1),
      map((estados) => StringUtil.objectAlphabeticalOrder(estados, 'nome')),
      catchError((error) => {
        this.exceptionService.handleError(error);
        return throwError(error);
      })
    );
  }

  getMunicipios(estado: string): Observable<Array<IbgeMunicipio>> {
    return this.httpClient
      .get<Array<IbgeMunicipio>>(`${IbgeService.API_ESTADOS}/${estado}/municipios`)
      .pipe(
        take(1),
        map((municipios) => StringUtil.objectAlphabeticalOrder(municipios, 'nome')),
        catchError((error) => {
          this.exceptionService.handleError(error);
          return throwError(error);
        })
      );
  }

  getMunicipio(idMunicipio: string): Observable<IbgeMunicipio> {
    return this.httpClient
      .get<IbgeMunicipio>(`${IbgeService.API_MUNICIPIOS}/${idMunicipio}`)
      .pipe(
        take(1),
        catchError((error) => {
          this.exceptionService.handleError(error);
          return throwError(error);
        })
      );
  }
}
