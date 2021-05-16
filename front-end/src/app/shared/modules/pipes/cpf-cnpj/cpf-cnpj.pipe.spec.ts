import { TestBed } from '@angular/core/testing';
import { CpfCnpjPipe } from './cpf-cnpj.pipe';

describe('cpf-cnpj.pipe.spec | CpfCnpjPipe', () => {

  let pipe: CpfCnpjPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CpfCnpjPipe]
    });

    pipe = TestBed.inject(CpfCnpjPipe);
  });

  it('Deve ser criado', () => {
    expect(pipe).toBeTruthy();
  });

  it('Deve aplicar máscara de CPF', () => {
    expect(pipe.transform('00000000000')).toBe('000.000.000-00');
  });

  it('Deve aplicar máscara de CNPJ', () => {
    expect(pipe.transform('00000000000000')).toBe('00.000.000/0000-00');
  });

});
