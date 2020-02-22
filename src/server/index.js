import express from 'express';
import compression from 'compression';

import { DEFAULT_PORT, DIST_PATH, JSON_SPACES_NUMBER } from './constants';
import cors from './middlewares/cors';
import items from './routes/items';
import users from './routes/users';

const PORT = process.env.PORT || DEFAULT_PORT;
const app = express();

app.use(cors);
app.use(compression());
app.use(express.json());
app.use(express.static(DIST_PATH));

app.set('json spaces', JSON_SPACES_NUMBER);

app.use('/api', items, users);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
