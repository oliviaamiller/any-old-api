const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Book = require('../lib/models/Book');

describe('any-old-api routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a book', async () => {
    const expected = {
      title: 'Kafka on the Shore', 
      author: 'Haruki Murakami',
      published: 2002
    };

    const res = await request(app).post('/api/v1/books').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('should be able to get a book by id', async () => {
    const book = await Book.insert({ title: 'Kafka on the Shore', author: 'Haruki Murakami', published: 2002 });
    const res  = await request(app).get(`/api/v1/books/${book.id}`);

    expect(res.body).toEqual(book);
  });

  it('returns a 404 if book not found', async () => {
    const res = await request(app).get('/api/v1/books/404');

    expect(res.status).toEqual(404);
  });

  it('should list all books', async () => {
    const expected = await Book.getAll();
    const res = await request(app).get('/api/v1/books');

    expect(res.body).toEqual(expected);
  });

  it('updates a book by id', async () => {
    const book = await Book.insert({ title: 'The Start of the Story', author: 'Lydio Davis', published: 1992 });
    const res = await request(app)
      .patch(`/api/v1/books/${book.id}`)
      .send({ title: 'The End of the Story', author: 'Lydia Davis', published: 1996 });

    const expected = {
      id: book.id,
      title: 'The End of the Story',
      author: 'Lydia Davis',
      published: 1996
    };
   
    expect(res.body).toEqual(expected);
    expect(await Book.getById(book.id)).toEqual(expected);
  });

  it('should be able to delete a book', async () => {
    const book = await Book.insert({ 
      title: 'Kafka on the Shore', 
      author: 'Haruki Murakami', 
      published: 2002 });
    const res = await request(app).delete(`/api/v1/books/${book.id}`);

    expect(res.body).toEqual(book);
  });
});
