import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('storage.service.spec | StorageService', () => {
  let service: StorageService;

  const storageData = {
    key: 'key',
    object: { key: 'value' },
  };

  beforeEach(() => {
    service = TestBed.inject(StorageService);
  });

  it('Deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('localStorage', () => {
    it('Deve setar item no localStorage', () => {
      const spy = spyOn(localStorage, 'setItem');
      service.localSetItem(storageData.key, storageData.object);
      expect(spy).toHaveBeenCalled();
    });

    it('Deve buscar item no localStorage', () => {
      service.localSetItem(storageData.key, storageData.object);
      const value = service.localGetItem(storageData.key);
      expect(value).toEqual({ key: 'value' });
    });

    it('Deve remover item no localStorage', () => {
      const spy = spyOn(localStorage, 'removeItem');
      service.localRemoveItem(storageData.key);
      expect(spy).toHaveBeenCalled();
    });

    it('Deve limpar localStorage', () => {
      const spy = spyOn(localStorage, 'clear');
      service.localClear();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('sessionStorage', () => {
    it('Deve setar item na sessionStorage', () => {
      const spy = spyOn(sessionStorage, 'setItem');
      service.sessionSetItem(storageData.key, storageData.object);
      expect(spy).toHaveBeenCalled();
    });

    it('Deve buscar item no sessionStorage', () => {
      service.sessionSetItem(storageData.key, storageData.object);
      const value = service.sessionGetItem(storageData.key);
      expect(value).toEqual({ key: 'value' });
    });

    it('Deve remover item na sessionStorage', () => {
      const spy = spyOn(sessionStorage, 'removeItem');
      service.sessionRemoveItem(storageData.key);
      expect(spy).toHaveBeenCalled();
    });

    it('Deve limpar sessionStorage', () => {
      const spy = spyOn(sessionStorage, 'clear');
      service.sessionClear();
      expect(spy).toHaveBeenCalled();
    });
  });
});
