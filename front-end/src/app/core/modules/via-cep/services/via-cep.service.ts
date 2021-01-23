import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ViaCep } from '../models/via-cep.interface';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {
  public static API = 'https://viacep.com.br/ws';

  constructor(private httpClient: HttpClient) {}

  get(cep: string): Observable<ViaCep> {
    return this.httpClient.get<ViaCep>(`${ViaCepService.API}/${cep}/json`).pipe(take(1));
  }
}
