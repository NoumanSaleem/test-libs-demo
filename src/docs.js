export const movieSchema = {
  type: 'object',
  properties: {
    movieId: {
      type: 'number'
    },
    title: {
      type: 'string'
    }
  },
  required: ['movieId', 'title']
};