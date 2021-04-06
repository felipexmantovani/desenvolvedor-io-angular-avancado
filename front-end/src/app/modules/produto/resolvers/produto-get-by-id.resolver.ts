import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../../../core/modules/loading/loading.service';
import { Produto } from '../models/produto.interface';
import { ProdutoService } from '../services/produto.service';

@Injectable()
export class ProdutoGetByIdResolver implements Resolve<Observable<Produto>> {
  constructor(
    private loadingService: LoadingService,
    private produtoService: ProdutoService
  ) {}

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<Produto> {
    this.loadingService.show();
    return this.produtoService
      .readById(activatedRouteSnapshot.params['id'])
      .pipe(finalize(() => this.loadingService.hide()));
  }
}
