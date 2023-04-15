const {Book} = require("./models");

async function setBook(req, res, next) {
  const id = req.params.id;
  const book = await Book.findByPk(id);
  
  if (!book) {
    res.render('common/404');

    return;
  }

  req.book = book;
  next();
}

module.exports = {
  setBook,
};
