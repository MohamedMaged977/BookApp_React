import React from "react";
import "./App.css";
import SearchPage from "./SearchPage";
import HomePage from "./HomePage";
import * as BooksAPI from "./BooksAPI";
import { Route, BrowserRouter as Router } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    Books: [],
  };

  getBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ Books: books });
    });
  };

  render() {
    return (
      <Router>
        <div>
          <Route
            path="/search"
            render={() => (
              <SearchPage books={this.state.Books} getBooks={this.getBooks} />
            )}
          />

          <Route
            exact
            path="/"
            render={() => (
              <HomePage books={this.state.Books} getBooks={this.getBooks} />
            )}
          />
        </div>
      </Router>
    );
  }
}
export default BooksApp;
