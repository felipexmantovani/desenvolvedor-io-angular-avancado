export class StringUtil {
  static resume(value: string, maxCharacters: number, suspensionPoints?: boolean): string {
    let valueResume = (value.substr(0, maxCharacters));
    if (suspensionPoints && value.length >= maxCharacters) {
      valueResume = `${valueResume}...`;
    }
    return valueResume.trim();
  }
}
