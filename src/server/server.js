import {} from 'dotenv/config';
import express from 'express';
import compression from 'compression';
import path from 'path';
import index from './routes/index';
import users from './routes/users';

const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(compression());
app.use(express.json());
app.set('json spaces', 4);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
