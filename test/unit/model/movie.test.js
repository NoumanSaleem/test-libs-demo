import chai from 'chai';
import sinon from 'sinon';
import 'sinon-as-promised';
import movie from '../../../src/resource/model/movie';
import { InvalidMovie } from '../../../src/resource/model/errors';

chai.should();

describe('movie model', function () {
  const requestMock = sinon.stub();

  beforeEach(function () {
    requestMock.reset();
    movie.__Rewire__('request', requestMock);
  });

  after(function () {
    movie.__ResetDependency__('request');
  });

  context('when given a movie id', function () {
    const movieId = 123;

    it('should pass movie id to origin service # 2', function (done) {
      requestMock.resolves({});

      movie(movieId)
        .then(() => {
          requestMock.args[0][0].should.equal(`http://dev-backstage.fandango.com/movie/movies/${movieId}`);
          done();
        });
    });

    it('should do handle 404 from origin service', function (done) {
      requestMock.rejects({ statusCode: 404 });

      movie(movieId)
        .then(() => done(new Error('this test should throw!')))
        .catch(err => {
          // err.constructor.name.should.equal('InvalidMovie');
          err.should.be.instanceof(InvalidMovie);
          done();
        });
    });
  });
});