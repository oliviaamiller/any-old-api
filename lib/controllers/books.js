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
  })

  .get('/', async (req, res) => {
    const books = await Book.getAll();
    res.send(books);
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedBook = await Book.updateById(id, req.body);

      if (!updatedBook){
        const error = new Error(`Order ${id} not found`);
        error.status = 404;
        throw error;
      }
         
      res.json(updatedBook);
    } catch (error) {
      next(error);
    }

  })

  .delete('/:id', async (req, res) => {
    const book = await Book.deleteById(req.params.id);
    res.send(book);
  });

