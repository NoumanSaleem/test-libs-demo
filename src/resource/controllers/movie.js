import model from '../model';
import { InvalidMovie } from '../model/errors';

export default function movie(req, res, next) {
  model.movie(req.params.id)
    .then(data => {
      res
        .status(200)
        .send(data);
    })
    .catch(err => {
      if (err instanceof InvalidMovie) {
        return res
          .status(404)
          .send({ errors: [ { message: 'Movie not found', id: 'notFound' } ] });
      }

      next(err);
    });
}