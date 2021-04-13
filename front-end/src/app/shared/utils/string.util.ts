import { AbstractControl, Validators } from '@angular/forms';

export class StringUtil {
  static resume(value: string, maxCharacters: number, suspensionPoints?: boolean): string {
    let valueResume = value.substr(0, maxCharacters);
    if (suspensionPoints && value.length >= maxCharacters) {
      valueResume = `${valueResume}...`;
    }
    return valueResume.trim();
  }

  static objectAlphabeticalOrder(array: Array<object>, key: string): Array<any> {
    return array.sort((a, b) => {
      return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
    });
  }

  static onlyDigits(value: string): string {
    return value.replace(/\D/g, '');
  }

  static maskCpf(value: string): string {
    value = value.replace(/\D/g, ''); // Remove tudo o que não é dígito
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto entre o terceiro e o quarto dígito
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto entre o sexto e o sétimo dígito
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca um hífen entre o nono e o décimo dígito
    return value;
  }

  static maskCnpj(value: string): string {
    value = value.replace(/\D/g, ''); // Remove tudo o que não é dígito
    value = value.replace(/^(\d{2})(\d)/, '$1.$2'); // Coloca ponto entre o segundo e o terceiro dígito
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); // Coloca ponto entre o quinto e o sexto dígito
    value = value.replace(/\.(\d{3})(\d)/, '.$1/$2'); // Coloca uma barra entre o oitavo e o nono dígito
    value = value.replace(/(\d{4})(\d)/, '$1-$2'); // Coloca um hífen depois do bloco de quatro dígitos
    return value;
  }

  static isValidCpf(): any {
    return (control: AbstractControl): Validators => {
      const cpf: string = control.value?.replace(/[^\d]+/g, '');
      if (cpf) {
        let numbers: any;
        let digits: string;
        let sum: number;
        let i: number;
        let result: number;
        let equalDigits: number;

        equalDigits = 1;
        if (cpf.length < 11) {
          return { cpfInvalido: true };
        }

        for (i = 0; i < cpf.length - 1; i++) {
          if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
            equalDigits = 0;
            break;
          }
        }

        if (!equalDigits) {
          numbers = cpf.substring(0, 9);
          digits = cpf.substring(9);
          sum = 0;
          for (i = 10; i > 1; i--) {
            sum += numbers.charAt(10 - i) * i;
          }

          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

          if (result !== Number(digits.charAt(0))) {
            return { cpfInvalido: true };
          }
          numbers = cpf.substring(0, 10);
          sum = 0;

          for (i = 11; i > 1; i--) {
            sum += numbers.charAt(11 - i) * i;
          }
          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

          if (result !== Number(digits.charAt(1))) {
            return { cpfInvalido: true };
          }
          return null;
        } else {
          return { cpfInvalido: true };
        }
      }
      return null;
    };
  }

  static isValidCnpj(): any {
    return (control: AbstractControl): Validators => {
      const cnpj: string = control.value?.replace(/[^\d]+/g, '');
      if (cnpj) {
        if (cnpj.length !== 14 ||
          cnpj === '00000000000000' ||
          cnpj === '11111111111111' ||
          cnpj === '22222222222222' ||
          cnpj === '33333333333333' ||
          cnpj === '44444444444444' ||
          cnpj === '55555555555555' ||
          cnpj === '66666666666666' ||
          cnpj === '77777777777777' ||
          cnpj === '88888888888888' ||
          cnpj === '9999999999999'
        ) {
          return { cnpjInvalido: true };
        }

        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        const digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        let i = 0;
        let resultado = 0;
        for (i = tamanho; i >= 1; i--) {
          soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
          if (pos < 2) {
            pos = 9;
          }
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado !== parseInt(digitos.charAt(0), 10)) {
          return { cnpjInvalido: true };
        }

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
          soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
          if (pos < 2) {
            pos = 9;
          }
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado !== parseInt(digitos.charAt(1), 10)) {
          return { cnpjInvalido: true };
        }
        return true;
      }
      return null;
    };
  }
}
