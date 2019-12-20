import React, { Component } from "react";

export class PostCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ""
    };
  }

  handleDeleteCategory(id) {
    fetch("http://localhost:8080/api/category/deleteCategory/" + id, {
      method: "GET",

      headers: {
        Authorization: "Bearer " + this.props.getUserToken,
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log("Result of posting a new question:");
        console.log(json);
      });
  }

  handlePostCategoryChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handlePostCategory(event) {
    fetch("http://localhost:8080/api/category/createCategory", {
      method: "POST",
      body: JSON.stringify({
        title: this.state.title
      }),
      headers: {
        Authorization: "Bearer " + this.props.getUserToken,
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log("Result of posting a new question:");
        console.log(json);
      });
  }

  render() {
    console.log(this.props.getCategories);

    return (
      <div className="container">
        <h1>Post a book category</h1>
        <div className="form-group">
          <input
            type="text"
            onChange={event => this.handlePostCategoryChange(event)}
            className="form-control"
            name="title"
          ></input>
          <butten
            className="btn btn-success"
            onClick={_ => this.handlePostCategory()}
          >
            Post category
          </butten>
        </div>

        <table className="table">
          {this.props.getCategories.map(c => (
            <tr>
              <td>{c.title}</td>
              <td>
                <button onClick={this.handleDeleteCategory.bind(this, c._id)}>
                  X
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

export default PostCategory;
