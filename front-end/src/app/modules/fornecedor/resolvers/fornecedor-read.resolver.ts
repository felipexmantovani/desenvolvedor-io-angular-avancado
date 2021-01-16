import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Fornecedor } from '../models/fornecedor.interface';
import { FornecedorService } from '../services/fornecedor.service';

@Injectable()
export class FornecedorReadResolver implements Resolve<Array<Fornecedor>> {
  constructor(private fornecedorService: FornecedorService) {}

  public resolve(): Observable<Array<Fornecedor>> {
    return this.fornecedorService.read();
  }
}
