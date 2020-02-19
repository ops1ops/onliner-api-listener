import express from 'express';
import compression from 'compression';
import index from './routes/index';
import users from './routes/users';

const PORT = process.env.PORT || 8080;
const app = express();

app.use(compression());
app.use(express.json());
app.use(express.static('dist'));

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

app.use('/', index);
app.use('/api/users', users);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
