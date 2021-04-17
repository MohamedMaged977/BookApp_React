import React from "react";
import "./App.css";
import SearchPage from "./SearchPage";
import HomePage from "./HomePage";
import * as BooksAPI from "./BooksAPI";
import { Route, BrowserRouter as Router } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    categorizedBooks: {},
  };

  setCategorizedBooks = (categorizedBooks) =>
    this.setState({ categorizedBooks });

  categorizeBooks = (books) => {
    const categorizedBooks = {};
    books.forEach((book) => {
      if (categorizedBooks[book.shelf]) {
        categorizedBooks[book.shelf].push(book);
      } else {
        categorizedBooks[book.shelf] = [book];
      }
    });
    this.setCategorizedBooks(categorizedBooks);
  };

  fetchBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        console.log(books);
        this.categorizeBooks(books);
      })
      .catch((err) => console.error("error getting books", err));
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
                books={this.state.categorizedBooks}
                fetchBooks={this.fetchBooks}
              />
            )}
          />

          <Route
            exact
            path="/"
            render={() => (
              <HomePage
                books={this.state.categorizedBooks}
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
