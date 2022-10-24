import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
app.set('port', process.env.PORT || 5000);

app.get('/', (req: Request, res: Response) => {
  res.send('express + Ts');
});

app.listen(app.get('port'), () => {
  console.log('ok');
});
