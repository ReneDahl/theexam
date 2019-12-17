module.exports = dal => {
  let express = require("express");
  let router = express.Router();

  router.get("/", (req, res) => {
    dal.getBooks().then(book => res.json(book));
  });

  //create new book

  router.post("/create", async (req, res) => {
    //remember to check if fields is empty before posting...
    let newBook = {
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      price: req.body.price,
      seller: req.body.seller,
      sellerEmail: req.body.sellerEmail
    };

    dal.createBook(newBook).then(newBook => res.json(newBook));
  });

  //find book by id.. Works...
  router.get("/:id", (req, res) => {
    let id = req.params.id;
    dal.getBookByID(id).then(book => res.json(book));
  });

  return router;
};
