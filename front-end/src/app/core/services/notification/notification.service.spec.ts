import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';

describe('notification.service.spec | NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationService],
    });

    service = TestBed.inject(NotificationService);
  });

  it('Deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('Deve chamar método de mensagem de erro', () => {
    const msg: string = 'Mensagem de erro.';
    service.error(msg);

    const spy = spyOn<any>(service, 'error');
    service.error(msg);
    expect(spy).toHaveBeenCalled();
  });

  it('Deve chamar método de mensagem de informação', () => {
    const msg: string = 'Mensagem de informação.';
    service.information(msg);

    const spy = spyOn<any>(service, 'information');
    service.information(msg);
    expect(spy).toHaveBeenCalled();
  });

  it('Deve chamar método de mensagem de sucesso', () => {
    const msg: string = 'Mensagem de sucesso.';
    service.success(msg);

    const spy = spyOn<any>(service, 'success');
    service.success(msg);
    expect(spy).toHaveBeenCalled();
  });

  it('Deve chamar método de mensagem de aviso', () => {
    const msg: string = 'Mensagem de aviso.';
    service.warning(msg);

    const spy = spyOn<any>(service, 'warning');
    service.warning(msg);
    expect(spy).toHaveBeenCalled();
  });
});
