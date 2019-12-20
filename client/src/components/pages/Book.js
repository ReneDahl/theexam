import React, { Component } from "react";
import { Collapse } from "bootstrap";

export class Book extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: []
    };
  }

  async getBooksFromTheAPI() {
    await fetch("https://theexam.herokuapp.com/api/books").then(res =>
      res.json().then(books => this.setState({ books }))
    );
  }

  componentDidMount() {
    this.getBooksFromTheAPI();
  }

  getook;

  render() {
    const bookItem = this.state.books
      .filter(c => c._id === this.props.title)
      .map(x => (
        <div>
          <h1>{x.title}</h1>
          <p>The author :{x.author}</p>
          <p>Book category :{x.category}</p>
          <p>The price : {x.price}</p>
          <p>The seller :{x.seller}</p>
          <p>The sellers mail : {x.sellerEmail}</p>
        </div>
      ));

    return <div className="container">{bookItem}</div>;
  }
}

export default Book;
