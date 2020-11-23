import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public sessionRemoveItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  public sessionClear(): void {
    sessionStorage.clear();
  }

  public localSetItem(key: string, object: any): void {
    localStorage.setItem(key, JSON.stringify(object));
  }

  public localGetItem(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  public localRemoveItem(key: string): void {
    localStorage.removeItem(key);
  }

  public localClear(): void {
    localStorage.clear();
  }
}
