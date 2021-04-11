import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../../../core/modules/loading/loading.service';
import { Fornecedor } from '../models/fornecedor.interface';
import { FornecedorService } from '../services/fornecedor.service';

@Injectable({
  providedIn: 'root'
})
export class FornecedorGetByIdResolver implements Resolve<Observable<Fornecedor>> {
  constructor(
    private loadingService: LoadingService,
    private fornecedorService: FornecedorService
  ) {}

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<Fornecedor> {
    this.loadingService.show();
    return this.fornecedorService
      .readById(activatedRouteSnapshot.params['id'])
      .pipe(finalize(() => this.loadingService.hide()));
  }
}
