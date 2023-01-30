import Coupon from '../src/model/coupon.model';
import Sale from '../src/model/sale.model';

test('Deve criar um pedido com 3 produtos e calcular o valor total', function () {
  const products: { name: string; price: number; amount: number }[] = [
    { name: 'Produto1', price: 100, amount: 3 },
    { name: 'Produto2', price: 200, amount: 2 },
    { name: 'Produto3', price: 300, amount: 1 },
  ];

  const sale = new Sale('11144477735', products);
  const saleTotalPrice = sale.getTotalPrice();

  expect(saleTotalPrice).toBe(1000);
});

test('Deve criar um pedido com 3 produtos e calcular o valor total', function () {
  const products: { name: string; price: number; amount: number }[] = [
    { name: 'Produto1', price: 100, amount: 3 },
    { name: 'Produto2', price: 200, amount: 2 },
    { name: 'Produto3', price: 300, amount: 1 },
  ];

  const sale = new Sale('11144477735', products);
  const coupon = new Coupon('DESCONTO10', 10);
  sale.applyCoupon(coupon);
  const saleTotalPriceDiscounted = sale.getTotalPriceWithDicount();

  expect(saleTotalPriceDiscounted).toBe(900);
});

test('Nãp deve criar um pedido com cpf inválido', function () {
  const products: { name: string; price: number; amount: number }[] = [
    { name: 'Produto1', price: 100, amount: 3 },
    { name: 'Produto2', price: 200, amount: 2 },
    { name: 'Produto3', price: 300, amount: 1 },
  ];

  const sale = new Sale('11144477735', products);
  const cpf = sale.getCpf();

  expect(cpf).toBe('11144477735');
});
