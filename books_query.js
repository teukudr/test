const { Book } = require('./models');

//Query Insert Data : create
Book.bulkCreate([{ title: 'test', coverImage: 'coverImage', synopsis: 'synopsis', publisher: 'publisher', author: 'author', price: 10 }, { title: 'test', coverImage: 'coverImage', synopsis: 'synopsis', publisher: 'publisher', author: 'author', price: 10 }]).then((data) => console.log(data));

//Query select : findAll
// Book.findByPk(4).then((data)=>console.log(data))

//Query update : Update
// Book.update({title: 'Ilmu Pengetahuan Alam'}, {where: {id: 4}}).then((data)=> console.log(data))

//Query drop: destroy
// Book.destroy({truncate:true, restartIdentity:true}).then((data)=>console.log(data))

