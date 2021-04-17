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

  /* setCategorizedBooks = (books) => this.setState({ Books: books });

  categorizeBooks = (books) => {
    this.setCategorizedBooks(books);
  };
*/
  fetchBooks = () => {
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
              <SearchPage
                hideSearchPage={this.hideSearchPage}
                books={this.state.Books}
                fetchBooks={this.fetchBooks}
              />
            )}
          />

          <Route
            exact
            path="/"
            render={() => (
              <HomePage
                books={this.state.Books}
                setBooks={this.setCategorizedBooks}
                fetchBooks={this.fetchBooks}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}
export default BooksApp;
