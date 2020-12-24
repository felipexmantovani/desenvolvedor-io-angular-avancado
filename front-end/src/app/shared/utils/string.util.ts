export class StringUtil {
  public static resume(value: string, maxCharacters: number, suspensionPoints?: boolean): string {
    let valueResume = (value.substr(0, maxCharacters));
    if (suspensionPoints && value.length >= maxCharacters) {
      valueResume = `${valueResume}...`;
    }
    return valueResume.trim();
  }

  public static objectAlphabeticalOrder(array: Array<object>, key: string): Array<any> {
    return array.sort((a, b) => {
      return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
    });
  }

  public static onlyDigits(value: string): string {
    return value.replace(/\D/g, '');
  }
}
