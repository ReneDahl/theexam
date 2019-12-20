import React, { Component } from "react";
import Book from "./Book";
import Books from "./Books";
import { Link, Router } from "@reach/router";

export class category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: []
    };
  }

  async getBooksFromTheAPI() {
    await fetch("http://localhost:8080/api/books").then(res =>
      res.json().then(books => this.setState({ books }))
    );
  }

  getBook(title) {
    return this.state.books.find(c => c.title === this.props.title);
  }

  componentDidMount() {
    this.getBooksFromTheAPI();
  }

  render() {
    const category = this.props.getCategory(this.props._id);

    const book = this.state.books.filter(c => c.category === category.title);

    return (
      <div className="container">
        <h3>{category.title}</h3>

        {book.map(q => (
          <li key={q._id}>
            <Link to={`/book/${q._id}`}>{q.title}</Link>
          </li>
        ))}
      </div>
    );
  }
}

export default category;
