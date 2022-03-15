const pool = require('../utils/pool');

module.exports = class Book {
  id;
  title;
  author;
  published;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.author = row.author;
    this.published = row.published;
  }


  static async insert({ title, author, published }) {
    const { rows } = await pool.query(
      `
        INSERT INTO 
            books(title, author, published)
        VALUES
            ($1, $2, $3)
        RETURNING
            *
      `,
      [title, author, published]
    );
    return new Book(rows[0]);
  }
};
