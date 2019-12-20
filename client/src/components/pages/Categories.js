import React, { Component } from "react";
import { Link, Router } from "@reach/router";

export class Categories extends Component {
  render() {
    return (
      <div className="container">
        <h1>Book categories</h1>

        {this.props.categories.map(q => (
          <li key={q._id}>
            <Link to={`/category/${q.title}/${q._id}`}>{q.title}</Link>
          </li>
        ))}
      </div>
    );
  }
}

export default Categories;
