import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { LoadingService } from '../../../core/modules/loading/loading.service';
import { ExceptionService } from '../../../core/services/exception/exception.service';
import { Fornecedor } from '../models/fornecedor.interface';
import { FornecedorService } from '../services/fornecedor.service';

@Injectable()
export class FornecedorGetByIdResolver implements Resolve<Observable<Fornecedor>> {
  constructor(
    private loadingService: LoadingService,
    private fornecedorService: FornecedorService,
    private exceptionService: ExceptionService
  ) {}

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<Fornecedor> {
    this.loadingService.show();
    return this.fornecedorService
      .readById(activatedRouteSnapshot.params['id'])
      .pipe(
        catchError((error) => {
          this.exceptionService.handleError(error);
          return throwError(error);
        }),
        finalize(() => this.loadingService.hide())
      );
  }
}
