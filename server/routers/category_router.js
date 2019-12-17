module.exports = dal => {
  let express = require("express");
  let router = express.Router();

  router.post("/createCategory", async (req, res) => {
    console.log("dsds");

    //Check if user is admin before posting, how to?

    let newCategory = {
      title: req.body.title
    };
    dal.createCategory(newCategory).then(newCategory => res.json(newCategory));
  });

  router.get("/deleteCategory/:id", (req, res) => {
    //find the category, and remove the item.
    let _id = req.params.id;
    dal.deleteCategoryById(_id).then(category => res.json(category));
  });

  //remove category

  return router;
};
