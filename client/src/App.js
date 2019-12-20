import React, { Component } from "react";
import { Router, redirectTo, navigate } from "@reach/router";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./custom.css";
import "bootstrap/dist/js/bootstrap.js";
import "jquery/dist/jquery.js";
import $ from "jquery";
import Popper from "popper.js"; // for bootstrap

import Nav from "./components/layout/Nav";
import Category, { category } from "./components/pages/Category";
import Categories from "./components/pages/Categories";
import Book from "./components/pages/Book";
import Books from "./components/pages/Books";

//Post book and category
import PostBook from "./components/pages/PostBook";
import PostCategory from "./components/pages/PostCategory";
//Login---
import Login from "./Login";
import AuthService from "./AuthService";

export class App extends Component {
  API_URL = "https://theexam.herokuapp.com/api";

  constructor(props) {
    super(props);
    // Initialize the auth service with the path of the API authentication route.
    this.Auth = new AuthService(`${this.API_URL}/users/authenticate`);
    this.state = {
      categories: [],
      users: []
    };
  }

  async getData() {
    const resp = await this.Auth.fetch(`${this.API_URL}/books`);
    const data = await resp.json();
    this.setState({
      books: data
    });
  }

  async login(username, password) {
    try {
      const user = this.state.users.find(user => user.username === username);
      if (!user) {
        console.log("The user do not exist");
        return null;
      }
      //a way to make roles work..
      if (user.role.includes(0)) {
        console.log("du er admin");
        const resp = await this.Auth.login(username, password);
        console.log("Authentication:", resp.msg);
        navigate("/postcategory");
      } else {
        console.log(username, password, user.role);
        const resp = await this.Auth.login(username, password);
        console.log("Authentication:", resp.msg);
        navigate("/books");
        this.getData();
      }
    } catch (e) {
      console.log("Login", e);
    }
  }

  async postBook(title, author) {
    console.log(title, author);
  }

  async logout(event) {
    event.preventDefault();
    this.Auth.logout();
    navigate("/");
  }

  //gets all the categories from the api.
  async getCategoriesFromTheAPI() {
    await fetch("https://theexam.herokuapp.com/api/category").then(res =>
      res.json().then(categories => this.setState({ categories }))
    );
  }

  async getUsersFromTheAPI() {
    await fetch("https://theexam.herokuapp.com/api/users").then(res =>
      res.json().then(users => this.setState({ users }))
    );
  }

  getCategory(_id) {
    return this.state.categories.find(c => c._id === _id);
  }

  getBook(title) {
    return this.state.books.find(c => c._id === title);
  }
  //gets all the books from the api.

  componentDidMount() {
    this.getCategoriesFromTheAPI();
    this.getUsersFromTheAPI();
  }

  render() {
    return (
      <div className="App">
        <Nav></Nav>
        <button
          onClick={event => {
            this.logout(event);
          }}
        >
          Logout.
        </button>
        <Router>
          <Login
            login={(username, password) => this.login(username, password)}
            path="/login"
          />
          <Categories categories={this.state.categories} path="/"></Categories>

          <Category
            path="/category/:title/:_id"
            getCategory={_id => this.getCategory(_id)}
          ></Category>

          <Book path="/book/:title"></Book>
          <Books
            getUserName={this.Auth.getUsername()}
            getUserToken={this.Auth.getToken()}
            getBooksFromCategories={this.state.categories}
            path="/books"
          ></Books>
          <Login path="/login"></Login>
          <PostBook
            postBook={(title, author) => this.postBook(title, author)}
            path="/postbook"
          ></PostBook>
          <PostCategory
            getCategories={this.state.categories}
            getUserToken={this.Auth.getToken()}
            path="/postcategory"
          ></PostCategory>
        </Router>
      </div>
    );
  }
}

export default App;
