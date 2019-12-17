class CategoryDal {
  //constructor for create a user model class
  constructor(mongoose) {
    this.mongoose = mongoose;
    const categorySchema = new mongoose.Schema({
      title: String
    });
    this.categoryModel = mongoose.model("category", categorySchema);
  }

  async createCategory(category) {
    let newCategory = new this.categoryModel(category);
    return newCategory.save();
  }

  //remove category

  async deleteCategoryById(_id) {
    try {
      //finding a book by its id, with moongose. Do the book doenst exist, it will catch the error message.
      return await this.categoryModel.findByIdAndDelete(_id);
    } catch (error) {
      console.error("deleteCategoryById", error.message);
      return {};
    }
  }
}

module.exports = mongoose => new CategoryDal(mongoose);
