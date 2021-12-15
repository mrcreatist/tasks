import * as express from 'express';

import { master } from '../controller';

export const register = (app: express.Application) => {
    app.get('/', (req, res) => master.welcome(req, res))
};
