export class StringUtil {
  static resume(value: string, maxCharacters: number, suspensionPoints?: boolean): string {
    let valueResume = (value.substr(0, maxCharacters));
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
}
