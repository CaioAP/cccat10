import express from 'express';
import sale from './router/sale.route';

const app = express();
app.use(express.json());
app.use('/sales', sale);
app.listen(3000, function () {
  console.log('App listening on port:3000');
});

export default app;
