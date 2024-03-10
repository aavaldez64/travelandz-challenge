export class Validators {
  static isEmail(value: string) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(value);
  }
  static isPhone(value: string) {
    const phoneRegex = /^\+?([0-9]{1,2})\)?([0-9]{10})$/;
    return phoneRegex.test(value);
  }
}
