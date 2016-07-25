import nock from 'nock';
import supertest from 'supertest';
import express from 'express';
import router from '../../src/router';
import { movieSchema } from '../../src/docs';
import chai from 'chai';
import chaiJSONSchema from 'chai-json-schema';

chai.use(chaiJSONSchema);
const should = chai.should();
const app = express();
app.use(router);

const mockBackstage = nock('http://dev-backstage.fandango.com');

describe('movie', function () {
  context('given a valid movie id', function () {
    const movieId = 123;

    it('should return a movie', function (done) {
      mockBackstage
        .get(`/movie/movies/${movieId}`)
        .reply(200, { id: movieId, title: 'hello' });

      supertest(app)
        .get(`/movies/${movieId}`)
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);

          res.body.should.be.jsonSchema(movieSchema);

          done();
        });
    });
  });
});