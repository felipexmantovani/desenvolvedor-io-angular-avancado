import { FormBuilder, FormGroup } from '@angular/forms';
import { StringUtil } from './string.util';

describe('string.util.spec | StringUtil', () => {

  let textResume: string;

  let form: FormGroup;

  beforeEach(() => {
    textResume = 'Programador';

    form = new FormBuilder().group({
      cpf: [null, [StringUtil.isValidCpf()]],
      cnpj: [null, [StringUtil.isValidCnpj()]]
    });
  });

  describe('resume()', () => {
    it('Deve resumir para 3 caracteres', () => {
      textResume = StringUtil.resume(textResume, 3);
      expect(textResume).toBe('Pro');
    });

    it('Deve resumir para 7 caracteres e adicionar reticencias no final', () => {
      textResume = StringUtil.resume(textResume, 7, true);
      expect(textResume).toBe('Program...');
    });

    it('Deve resumir para 7 caracteres e não adicionar reticencias no final', () => {
      textResume = StringUtil.resume(textResume, 7);
      expect(textResume).toBe('Program');
    });

    it('Deve resumir somente se quantidade de caracteres do parâmetro "value" for maior ou igual ao parâmetro "maxCharacters"', () => {
      textResume = StringUtil.resume(textResume, 15);
      expect(textResume).toBe('Programador');

      textResume = StringUtil.resume(textResume, 3);
      expect(textResume).toBe('Pro');
    });
  });

  describe('objectAlphabeticalOrder()', () => {
    it('Deve retornar em ordem alfabética', () => {
      let array = [{id: 1, nome: 'João'}, {id: 2, nome: 'Pedro'}, {id: 3, nome: 'Felipe'}];
      array = StringUtil.objectAlphabeticalOrder(array, 'nome');
      expect(array).toEqual([{id: 3, nome: 'Felipe'}, {id: 1, nome: 'João'}, {id: 2, nome: 'Pedro'}]);
    });
  });

  describe('onlyDigits()', () => {
    it('Deve retornar apenas os números', () => {
      const value = '123.456-678-90-Abc!@#$%';
      expect(StringUtil.onlyDigits(value)).toBe('12345667890');
    });
  });

  describe('maskCpf()', () => {
    it('Deve aplicar máscara de CPF corretamente', () => {
      const cpf = '39222808037';
      expect(StringUtil.maskCpf(cpf)).toBe('392.228.080-37');
    });
  });

  describe('maskCnpj()', () => {
    it('Deve aplicar máscara de CNPJ corretamente', () => {
      const cpf = '75130307000106';
      expect(StringUtil.maskCnpj(cpf)).toBe('75.130.307/0001-06');
    });
  });

  describe('isValidCpf()', () => {
    it('Não deve conter erro { cpfInvalido: true } caso valor for null', () => {
      form.get('cpf').setValue(null);
      expect(form.get('cpf').errors).not.toEqual({ cpfInvalido: true });
    });

    it('Deve conter erro { cpfInvalido: true } caso não tiver número de caracteres necessários', () => {
      form.get('cpf').setValue('123');
      expect(form.get('cpf').errors).toEqual({ cpfInvalido: true });
    });

    it('Deve conter erro { cpfInvalido: true } caso for um CPF inválido', () => {
      form.get('cpf').setValue('00985777465');
      expect(form.get('cpf').errors).toEqual({ cpfInvalido: true });
    });

    it('Deve conter erro { cpfInvalido: true } caso todos os números forem iguais', () => {
      form.get('cpf').setValue('99999999999');
      expect(form.get('cpf').errors).toEqual({ cpfInvalido: true });
    });

    it('Não deve conter erro { cpfInvalido: true } caso CPF seja válido', () => {
      form.get('cpf').setValue('65095130050');
      expect(form.get('cpf').errors).not.toEqual({ cpfInvalido: true });
    });

    it('Deve conter erro { cpfInvalido: true } caso dígito verificador for incorreto', () => {
      form.get('cpf').setValue('65095130051');
      expect(form.get('cpf').errors).toEqual({ cpfInvalido: true });
    });
  });

  describe('isValidCnpj()', () => {
    it('Não deve conter erro { cnpjInvalido: true } caso valor for null', () => {
      form.get('cnpj').setValue(null);
      expect(form.get('cnpj').errors).not.toEqual({ cnpjInvalido: true });
    });

    it('Deve conter erro { cnpjInvalido: true } caso todos os números forem iguais', () => {
      form.get('cnpj').setValue('99999999999999');
      expect(form.get('cnpj').errors).toEqual({ cnpjInvalido: true });
    });

    it('Deve conter erro { cnpjInvalido: true } caso não tiver número de caracteres necessários', () => {
      form.get('cnpj').setValue('123');
      expect(form.get('cnpj').errors).toEqual({ cnpjInvalido: true });
    });

    it('Não deve conter erro { cnpjInvalido: true } caso CNPJ seja válido', () => {
      form.get('cnpj').setValue('48568704000191');
      expect(form.get('cnpj').errors).not.toEqual({ cnpjInvalido: true });
    });

    it('Deve conter erro { cnpjInvalido: true } caso dígito verificador for incorreto', () => {
      form.get('cnpj').setValue('48568704000190');
      expect(form.get('cnpj').errors).toEqual({ cnpjInvalido: true });
    });
  });

});
