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

  //create book
  async createBook(book) {
    let newBook = new this.bookModel(book);
    return newBook.save();
  }

  //list books by category
}

module.exports = mongoose => new BookDal(mongoose);
