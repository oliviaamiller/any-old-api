-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS books;

CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL, 
    published INT
);

INSERT INTO
    books (title, author, published)

VALUES
    ('Kafka on the Shore', 'Haruki Murakami', 2002),
    ('The End of the Story', 'Lydia Davis', 1995);
