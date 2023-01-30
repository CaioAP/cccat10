import Coupon from './coupon.model';
import Cpf from './cpf.model';
import Product from './product.model';

export default class Sale {
  private cpf: string;
  private coupon?: Coupon;

  constructor(cpf: string, readonly products: Product[]) {
    this.cpf = new Cpf(cpf).get();
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.products.forEach(
      (product: Product) => (totalPrice += product.price * product.amount),
    );
    return totalPrice;
  }

  getTotalPriceWithDicount() {
    let discountPrice = 0;
    const totalPrice = this.getTotalPrice();
    if (this.coupon) {
      discountPrice = totalPrice * (this.coupon.disocunt / 100);
    }
    return Math.round((totalPrice - discountPrice) * 100) / 100;
  }

  applyCoupon(coupon: Coupon) {
    this.coupon = coupon;
  }

  getCpf() {
    return this.cpf;
  }
}
