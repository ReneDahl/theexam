class CategoryDal {
  //constructor for create a category model class
  constructor(mongoose) {
    this.mongoose = mongoose;
    const categorySchema = new mongoose.Schema({
      title: String
    });
    this.categoryModel = mongoose.model("category", categorySchema);
  }

  async getCategories() {
    try {
      return await this.categoryModel.find({});
    } catch (error) {
      console.error("getCategories:", error.message);
      return {};
    }
  }

  async getCategoryByID(id) {
    try {
      //finding a book by its id, with moongose. Do the book doenst exist, it will catch the error message.
      return await this.categoryModel.findById(id);
    } catch (error) {
      console.error("getCategoryByID", error.message);
      return {};
    }
  }

  async testCategories() {
    let l = (await this.getCategories()).length;
    console.log("Categories in system:", l);
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
