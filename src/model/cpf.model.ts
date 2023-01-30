export default class Cpf {
  private cpf: string;

  constructor(cpf: string) {
    this.cpf = this.sanitize(cpf);
    this.validate();
  }

  get() {
    return this.cpf;
  }

  sanitize(cpf: string) {
    return cpf.replace(/[^0-9]/g, '').trim();
  }

  validate() {
    const isCpfInvalid =
      !this.cpf ||
      this.cpf.length !== 11 ||
      this.cpf.split('').every((digit) => digit === this.cpf[0]);
    if (isCpfInvalid) throw Error('CPF inválido');
    try {
      let { firstDigitTotal, secondDigitTotal } = this.calculateDigitsTotals();
      const { firstDigitVerifier, secondDigitVerifier } =
        this.calculateDigitsVerifiers(firstDigitTotal, secondDigitTotal);

      const currentDigitVerifier = this.getCurrentDigitVerifier();
      const resultDigitVerifier = `${firstDigitVerifier}${secondDigitVerifier}`;
      const isVerified = currentDigitVerifier == resultDigitVerifier;

      if (!isVerified) throw Error('CPF inválido');
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  calculateDigitsTotals(): {
    firstDigitTotal: number;
    secondDigitTotal: number;
  } {
    let firstDigitTotal = 0;
    let secondDigitTotal = 0;
    for (let digitIndex = 1; digitIndex < this.cpf.length - 1; digitIndex++) {
      const currentDigit = Number(
        this.cpf.substring(digitIndex - 1, digitIndex),
      );
      if (isNaN(currentDigit)) throw Error('CPF inválido');
      firstDigitTotal = firstDigitTotal + (11 - digitIndex) * currentDigit;
      secondDigitTotal = secondDigitTotal + (12 - digitIndex) * currentDigit;
    }
    return { firstDigitTotal, secondDigitTotal };
  }

  calculateDigitsVerifiers(
    firstDigitTotal: number,
    secondDigitTotal: number,
  ): {
    firstDigitVerifier: number;
    secondDigitVerifier: number;
  } {
    let rest = firstDigitTotal % 11;
    const firstDigitVerifier = rest < 2 ? 0 : 11 - rest;
    secondDigitTotal += 2 * firstDigitVerifier;
    rest = secondDigitTotal % 11;
    const secondDigitVerifier = rest < 2 ? 0 : 11 - rest;
    return {
      firstDigitVerifier,
      secondDigitVerifier,
    };
  }

  getCurrentDigitVerifier() {
    return this.cpf.substring(this.cpf.length - 2, this.cpf.length);
  }
}
