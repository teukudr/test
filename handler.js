const {Book} = require("./models");
const cloudinary = require("./cloudinary");

async function handleCreateBook(req, res) {
  const fileBase64 = req.file.buffer.toString("base64");
  const file = `data:${req.file.mimetype};base64,${fileBase64}`;

    cloudinary.uploader.upload(file, async function (err, result) {
      if (!!err) {
        console.log(err);
        return res.status(400).json({
          message: "Gagal upload file!",
        });
      }

      const {title, author} = req.body;

      const book = await Book.create({title, author, coverImage: result.url});
      req.flash('info', 'Book succesfully created');
      res.redirect("/books");
    });
}

function handleCreateBookForm(req, res) {
  res.render('books/create');
}

function handleUpdateBookForm(req, res) {
  const book = req.book;
  res.render('books/:id/update', {book});
}

async function handleListBooks(req, res) {
  const allBooks = await Book.findAll();

  res.render('books/index', {books: allBooks, additional_data: "test test halo halo"});
}

function handleGetBook(req, res) {
  const book = req.book;

  res.status(200).json(book);
}

async function handleUpdateBook(req, res) {
  const idBook = req.params.id;
  if(!req.file){
    await Book.update(req.body, {where: {id: idBook}})
    req.flash('update', 'Book succesfully updated');
    res.redirect("/books");
    return;
  }

  const fileBase64 = req.file.buffer.toString("base64");
  const file = `data:${req.file.mimetype};base64,${fileBase64}`;

    cloudinary.uploader.upload(file, async function (err, result) {
      if (!!err) {
        console.log(err);
        return res.status(400).json({
          message: "Gagal upload file!",
        });
      }

      const {title, author} = req.body;

      await Book.update({title, author, coverImage: result.url}, {where:{id: idBook}});
      req.flash('info', 'Book succesfully updated');
      res.redirect("/books");
    });

  // try{
  //   const idBook = req.params.id;

  //   await Book.update(req.body, {where: {id: idBook}})
  //   req.flash('update', 'Book succesfully updated');
  //   res.redirect("/books");
  // } catch(error){
  //   console.log('error', error);
  // }
  
}

async function handleDeleteBook(req, res) {
  const id = req.params.id;

  await Book.destroy({where:{id}});
  req.flash('delete', 'Book succesfully deleted');
  res.redirect("/books");
}

module.exports = {
  handleCreateBook,
  handleListBooks,
  handleGetBook,
  handleUpdateBook,
  handleDeleteBook,
  handleCreateBookForm,
  handleUpdateBookForm
};
