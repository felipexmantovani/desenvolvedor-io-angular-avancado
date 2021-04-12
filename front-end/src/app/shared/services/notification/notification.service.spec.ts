import { TestBed } from '@angular/core/testing';
import { PoNotificationService } from '@po-ui/ng-components';
import { NotificationService } from './notification.service';

describe('notification.service.spec | NotificationService', () => {
  let service: NotificationService;
  let poNotification: PoNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationService],
    });

    service = TestBed.inject(NotificationService);
    poNotification = TestBed.inject(PoNotificationService);
  });

  it('Deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('Deve chamar método de mensagem de erro', () => {
    const spy = spyOn<any>(poNotification, 'error');
    service.error('Mensagem de erro.');
    expect(spy).toHaveBeenCalled();
  });

  it('Deve chamar método de mensagem de informação', () => {
    const spy = spyOn<any>(poNotification, 'information');
    service.information('Mensagem de informação.');
    expect(spy).toHaveBeenCalled();
  });

  it('Deve chamar método de mensagem de sucesso', () => {
    const spy = spyOn<any>(poNotification, 'success');
    service.success('Mensagem de sucesso.');
    expect(spy).toHaveBeenCalled();
  });

  it('Deve chamar método de mensagem de aviso', () => {
    const spy = spyOn<any>(poNotification, 'warning');
    service.warning('Mensagem de aviso.');
    expect(spy).toHaveBeenCalled();
  });
});
