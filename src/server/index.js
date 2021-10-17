import compression from 'compression';
import express from 'express';

import { DEFAULT_PORT, DIST_PATH, JSON_SPACES_NUMBER } from './constants';
import cors from './middlewares/cors';
import categories from './routes/category';
import items from './routes/items';
import users from './routes/users';

const PORT = process.env.PORT || DEFAULT_PORT;

const app = express();

app.set('json spaces', JSON_SPACES_NUMBER);

app.use(cors);
app.use(compression());
app.use(express.json());
app.use(express.static(DIST_PATH));

app.use('/api', items, users, categories);

app.get('*', (req, res) => {
  res.sendFile(`${DIST_PATH}/index.html`);
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
