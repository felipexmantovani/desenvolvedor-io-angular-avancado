import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ViaCep } from '../models/via-cep.interface';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {
  constructor(private httpClient: HttpClient) {}

  get(cep: string): Observable<ViaCep> {
    return this.httpClient.get<ViaCep>(`https://viacep.com.br/ws/${cep}/json`).pipe(take(1));
  }
}
