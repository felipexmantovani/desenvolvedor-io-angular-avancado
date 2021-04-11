import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../../../core/modules/loading/loading.service';
import { AuthService } from '../../auth/services/auth.service';
import { Produto } from '../models/produto.interface';
import { ProdutoService } from '../services/produto.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoReadResolver implements Resolve<Array<Produto>> {
  constructor(
    private loadingService: LoadingService,
    private produtoService: ProdutoService,
    private authService: AuthService
  ) {}

  public resolve(): Observable<Array<Produto>> {
    if (this.authService.isLogged()) {
      this.loadingService.show();
      return this.produtoService
        .read()
        .pipe(finalize(() => this.loadingService.hide()));
    }
  }
}
