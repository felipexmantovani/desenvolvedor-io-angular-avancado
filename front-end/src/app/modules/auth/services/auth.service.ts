import { Injectable } from '@angular/core';
import { StorageService } from '../../../core/services/storage/storage.service';
import { AUTH_CONFIG } from '../auth.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private storageService: StorageService) {}

  public getToken(): any {
    return this.storageService.localGetItem(AUTH_CONFIG.keyToken);
  }
}
