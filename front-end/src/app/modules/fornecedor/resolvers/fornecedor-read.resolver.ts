import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../../../core/modules/loading/loading.service';
import { Fornecedor } from '../models/fornecedor.interface';
import { FornecedorService } from '../services/fornecedor.service';

@Injectable()
export class FornecedorReadResolver implements Resolve<Array<Fornecedor>> {
  constructor(
    private loadingService: LoadingService,
    private fornecedorService: FornecedorService
  ) {}

  public resolve(): Observable<Array<Fornecedor>> {
    this.loadingService.show();
    return this.fornecedorService
      .read()
      .pipe(finalize(() => this.loadingService.hide()));
  }
}
