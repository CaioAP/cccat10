import { Request, Response } from 'express';
import fs from 'fs';
import Sale from '../../model/sale.model';

export default class SaleController {
  create(req: Request, res: Response) {
    const sale = new Sale(req.body.cpf, req.body.products);

    try {
      this.checkIfDatabaseExists();

      let fileData = fs.readFileSync('../../database/sale.json', 'utf8');
      let fileDataJson = JSON.parse(fileData);

      fileDataJson.push(sale);

      fs.writeFileSync(
        '../../database/sale.json',
        JSON.stringify(fileDataJson),
      );
    } catch (error) {
      console.error(error);
    }

    res.send({ status: 200, message: 'Sales created', data: sale });
  }

  getOne() {
    return Sale;
  }

  checkIfDatabaseExists() {
    const databasePathExists = fs.existsSync('../../database');
    if (!databasePathExists) fs.mkdirSync('../../database');

    const salePathExists = fs.existsSync('../../database/sale.json');
    if (!salePathExists) fs.writeFileSync('../../database/sale.json', '[]');
  }
}
