module.exports = dal => {
  let express = require("express");
  let router = express.Router();
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

  return router;
};
