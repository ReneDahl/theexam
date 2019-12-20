import React, { Component } from "react";
import { Button } from "bootstrap";

export class PostBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      author: "",
      category: "",
      price: "",
      seller: "",
      sellerEmail: ""
    };
  }

  handlePostBookChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handlePostBook(event) {
    this.props.postBook(
      this.state.title,
      this.state.author,
      this.state.category,
      this.state.price,
      this.state.seller,
      this.state.sellerEmail
    );
    //this.props.login()
  }

  render() {
    return (
      <div className="container">
        <h1>Post book</h1>

        <div className="form-group">
          <label>Book title</label>
          <input
            className="form-control"
            onChange={event => this.handlePostBookChange(event)}
            type="text"
            name="title"
          ></input>
        </div>
        <div className="form-group">
          <label>Book author</label>
          <input
            className="form-control"
            onChange={event => this.handlePostBookChange(event)}
            type="text"
            name="author"
          ></input>
        </div>
        <div className="form-group">
          <label>Book category</label>
          <input
            className="form-control"
            onChange={event => this.handlePostBookChange(event)}
            type="text"
            name="category"
          ></input>
        </div>
        <div className="form-group">
          <label>Book price</label>
          <input
            className="form-control"
            onChange={event => this.handlePostBookChange(event)}
            type="text"
            name="price"
          ></input>
        </div>

        <div className="form-group">
          <label>Your name</label>
          <input
            className="form-control"
            onChange={event => this.handlePostBookChange(event)}
            type="text"
            name="seller"
          ></input>
        </div>
        <div className="form-group">
          <label>Your mail</label>
          <input
            className="form-control"
            onChange={event => this.handlePostBookChange(event)}
            type="text"
            name="sellerEmail"
          ></input>
        </div>

        <button
          onClick={_ => this.handlePostBook()}
          className="btn btn-success"
        >
          Post book
        </button>
      </div>
    );
  }
}

export default PostBook;
