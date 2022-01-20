import {Router} from 'express';

import {
  createGame,
  deleteGame,
  listGames,
  updateGame,
} from './controllers/gameController';

const routes = Router();

routes.post('/games', createGame);
routes.get('/games', listGames);
routes.put('/games/:gameId', updateGame);
routes.delete('/games/:gameId', deleteGame);

export default routes;
