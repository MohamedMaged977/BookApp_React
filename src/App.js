import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import BookShelf from "./BookShelf";
import SearchPage from "./SearchPage";
class BooksApp extends React.Component {
  state = {
    books: [],
    showSearchPage: false,
  };

  componentDidMount() {
    this.refPage();
  }
  refPage = () => {
    BooksAPI.getAll().then((bookss) => {
      this.setState(() => ({
        books: bookss,
      }));
      console.log(bookss);
    });
  };
  render() {
    return (
      <div className="app">
        <Router>
          <Route
            exact
            path="/"
            render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="new">
                  <BookShelf
                    books={this.state.books.filter(
                      (book) => book.shelf === "currentlyReading"
                    )}
                    shelf="currentlyReading"
                    refPage={this.refPage}
                  />
                  <BookShelf
                    books={this.state.books.filter(
                      (book) => book.shelf === "wantToRead"
                    )}
                    shelf="wantToRead"
                    refPage={this.refPage}
                  />
                  <BookShelf
                    books={this.state.books.filter(
                      (book) => book.shelf === "read"
                    )}
                    shelf="read"
                    refPage={this.refPage}
                  />
                </div>
                <div className="open-search-pos">
                  <Link to="/search" className="open-search">
                    Add
                  </Link>
                </div>
              </div>
            )}
          />
          <Route path="/search" render={() => <SearchPage />} />
        </Router>
      </div>
    );
  }
}

export default BooksApp;
