import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { APP_CONFIG } from '../../../app.config';
import { StorageService } from '../../../core/services/storage/storage.service';
import { HttpUtil } from '../../../shared/utils/http.util';
import { AUTH_CONFIG } from '../auth.config';
import { Token } from '../models/auth-token.interface';
import { Login } from '../models/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedBS: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private storageService: StorageService
  ) {}

  login(login: Login): Observable<Token> {
    return this.httpClient
      .post<Token>(`${APP_CONFIG.apiV1}/entrar`, login)
      .pipe(
        take(1),
        map((result) => HttpUtil.extractData(result)),
        tap((token: Token) => token.accessToken ? this.isLoggedBS.next(true) : this.isLoggedBS.next(false))
      );
  }

  logout(): void {
    this.storageService.localRemoveItem(AUTH_CONFIG.keyToken);
    this.storageService.localRemoveItem(AUTH_CONFIG.keyUser);
    this.isLoggedBS.next(false);
    this.router.navigateByUrl(`${AUTH_CONFIG.pathFront}/login`);
  }

  isLogged(): boolean {
    return this.getToken() ? true : false;
  }

  setTokenLocalStorage(token: Token): void {
    this.storageService.localSetItem(AUTH_CONFIG.keyToken, token.accessToken);
    this.storageService.localSetItem(AUTH_CONFIG.keyUser, token.userToken);
  }

  getToken(): any {
    return this.storageService.localGetItem(AUTH_CONFIG.keyToken);
  }

  getUser(): any {
    return this.storageService.localGetItem(AUTH_CONFIG.keyUser);
  }
}
