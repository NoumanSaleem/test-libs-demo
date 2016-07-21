import express from 'express';
import routes from '../config/routes';
import controllers from './resource/controllers';

const router = new express.Router();

router.get(routes.movie, controllers.movie);

export default router;