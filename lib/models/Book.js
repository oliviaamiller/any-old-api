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

  static async getById(id) {
    const { rows } = await pool.query(
      `
        SELECT
            *
        FROM
            books
        WHERE
            id=$1
     `,
      [id]
    );
    return new Book(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
        SELECT
            *
        FROM
            books
       `
    );
    return rows.map((row) => new Book(row));
  }

  static async updateById(id, { title, author, published }) {
    const currentBook = await Book.getById(id);

    if (!currentBook) return null;

    const newTitle = title ?? currentBook.title;
    const newAuthor = author ?? currentBook.author;
    const newPublished = published ?? currentBook.published;

    const { rows } = await pool.query(
      `
          UPDATE
              books
          SET
              title=$2,
              author=$3,
              published=$4
          WHERE
              id=$1
          RETURNING
              *   
        `,
      [id, newTitle, newAuthor, newPublished]
    );
    return new Book(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM 
            books
        WHERE
            id=$1
        RETURNING
            *
     `,
      [id] 
    );
    return new Book(rows[0]);
  }


};
