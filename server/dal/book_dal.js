class BookDal {
  //constructor for create a book model class
  constructor(mongoose) {
    this.mongoose = mongoose;
    const bookSchema = new mongoose.Schema({
      title: String
      //   author: String,
      //   category: Boolean,
      //   price: Number,
      //   seller: String,
      //   sellerEmail: String
    });
    this.bookModel = mongoose.model("book", bookSchema);
  }

  async createBook(book) {
    let newBook = new this.bookModel(book);
    return newBook.save();
  }
}

module.exports = mongoose => new BookDal(mongoose);
