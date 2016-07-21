import request from 'request-promise';
import { InvalidMovie } from './errors';

function formatServiceResponse(data) {
  return {
    movieId: data.id
  };
};

export default function movie(id) {
  return request(`http://dev-backstage.fandango.com/movie/movies/${id}`, { json: true })
    .then(formatServiceResponse)
    .catch(function (res) {
      if (404 === res.statusCode) {
        throw new InvalidMovie();
      } else {
        throw res;
      }
    });
}