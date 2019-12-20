import React, { Component } from "react";
import { navigate } from "@reach/router";
import PostBook from "./PostBook";
//Login---

export class Books extends Component {
  constructor(props) {
    super(props);
  }

  async postBook(title, author, category, price, seller, sellerEmail) {
    console.log(title, author);
    fetch("http://theexam.herokuapp.com/api/books/create", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        author: author,
        category: category,
        price: price,
        seller: seller,
        sellerEmail: sellerEmail
      }),
      headers: {
        Authorization: "Bearer " + this.props.getUserToken,
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
      });
  }

  render() {
    return (
      <div className="container">
        <h1>Welcome {this.props.getUserName}</h1>
        <p>Here you can add books</p>
        <PostBook
          getBooksFromCategories={this.props.getBooksFromCategories}
          postBook={(title, author, category, price, seller, sellerEmail) =>
            this.postBook(title, author, category, price, seller, sellerEmail)
          }
        ></PostBook>
      </div>
    );
  }
}

export default Books;
