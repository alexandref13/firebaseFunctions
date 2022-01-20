import {Response} from 'express';
import {db} from '../config/firebase';


interface gameProps {
  id: string,
  title: string,
  description: string,
}

interface Request{
  body: gameProps,
  params: { gameId: string }
}

const createGame = async (req: Request, res: Response) => {
  const {title, description} = req.body;

  try {
    if (title != null && description != null) {
      const game = db.collection('games').doc();

      const data = {
        id: game.id,
        title,
        description,
      };

      await game.set(data);

      return res.status(200).send({
        status: 'success',
        message: 'A new game has added',
        data: data,
      });
    } else {
      return res.status(400).send({
        status: 'Bad Request',
        message: 'Title or description is empty',
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const listGames = async (req: Request, res: Response, ) => {
  try {
    const allGames: gameProps[] = [];
    const querySnapshot = await db.collection('games').get();
    querySnapshot.forEach((doc: any) => allGames.push(doc.data()));
    return res.status(200).json(allGames);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateGame = async (req: Request, res: Response) => {
  const {title, description} = req.body;
  const {gameId} = req.params;

  try {
    const game = db.collection('games').doc(gameId);

    const hasGame = (await game.get()).data() || {};

    const data = {
      title: title || hasGame.title,
      description: description || hasGame.description,
    };

    await game.set(data).catch((error) => {
      return res.status(400).json({
        status: 'error',
        message: error.message,
      });
    });

    return res.status(200).json({
      status: 'success',
      message: 'Game updated successfully',
      data: data,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};


const deleteGame = async (req: Request, res: Response) => {
  const {gameId} = req.params;

  try {
    const game = db.collection('games').doc(gameId);

    await game.delete().catch((error) => {
      return res.status(400).json({
        status: 'error',
        message: error.message,
      });
    });

    return res.status(200).json({
      status: 'success',
      message: 'game deleted successfully',
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export {createGame, listGames, updateGame, deleteGame};
