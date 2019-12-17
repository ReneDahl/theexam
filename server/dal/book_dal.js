class BookDal {
  //constructor for create a book model class
  constructor(mongoose) {
    this.mongoose = mongoose;
    const bookSchema = new mongoose.Schema({
      title: String,
      author: String,
      category: String,
      price: Number,
      seller: String,
      sellerEmail: String
    });
    this.bookModel = mongoose.model("book", bookSchema);
  }

  async getBooks() {
    try {
      return await this.bookModel.find({});
    } catch (error) {
      console.error("getBooks:", error.message);
      return {};
    }
  }

  async testBooks() {
    let l = (await this.getBooks()).length;
    console.log("Books in system:", l);
  }

  //create book
  async createBook(book) {
    let newBook = new this.bookModel(book);
    return newBook.save();
  }

  //find book by id

  async getBookByID(id) {
    try {
      //finding a book by its id, with moongose. Do the book doenst exist, it will catch the error message.
      return await this.bookModel.findById(id);
    } catch (error) {
      console.error("getBookByID", error.message);
      return {};
    }
  }
}

module.exports = mongoose => new BookDal(mongoose);
