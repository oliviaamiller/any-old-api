const { Router } = require('express');
const Book = require('../models/Book');


module.exports = Router()
  .post('/', async (req, res) => {

    const book = await Book.insert(req.body);
    res.send(book);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const book = await Book.getById(req.params.id);

      res.send(book);
    } catch (error) {

      error.status = 404;
      next(error);
    }
  });
