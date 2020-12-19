export class StringUtil {
  public static resume(value: string, maxCharacters: number, suspensionPoints?: boolean): string {
    let valueResume = (value.substr(0, maxCharacters));
    if (suspensionPoints && value.length >= maxCharacters) {
      valueResume = `${valueResume}...`;
    }
    return valueResume.trim();
  }

  public static alphabeticalOrder(array: Array<any>): Array<any> {
    return array.sort((a, b) => {
      return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
    });
  }
}
