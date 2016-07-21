export function InvalidMovie() {
  this.message = 'The requested movie was not found.';
  this.id = 'invalidMovie';
}
InvalidMovie.prototype = Object.create(Error.prototype);
InvalidMovie.prototype.constructor = InvalidMovie;