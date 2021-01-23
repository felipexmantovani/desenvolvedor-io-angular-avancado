import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { StringUtil } from '../../../../shared/utils/string.util';
import { IbgeMunicipio } from '../models/municipio.interface';
import { IbgeUf } from '../models/uf.interface';

@Injectable({
  providedIn: 'root',
})
export class IbgeService {
  public static API = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

  constructor(private httpClient: HttpClient) {}

  public getEstados(): Observable<Array<IbgeUf>> {
    return this.httpClient.get<Array<IbgeUf>>(IbgeService.API).pipe(
      take(1),
      map((estados) => StringUtil.objectAlphabeticalOrder(estados, 'nome'))
    );
  }

  public getMunicipios(estado: string): Observable<Array<IbgeMunicipio>> {
    return this.httpClient
      .get<Array<IbgeMunicipio>>(`${IbgeService.API}/${estado}/municipios`)
      .pipe(
        take(1),
        map((municipios) => StringUtil.objectAlphabeticalOrder(municipios, 'nome'))
      );
  }
}
