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

  it('should list all books', async () => {
    const expected = await Book.getAll();
    const res = await request(app).get('/api/v1/books');

    expect(res.body).toEqual(expected);
  });
});
