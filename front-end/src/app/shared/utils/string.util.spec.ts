import { StringUtil } from './string.util';

describe('string.util.spec | StringUtil', () => {
  let textResume: string;

  beforeEach(() => {
    textResume = 'Programador';
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
});
