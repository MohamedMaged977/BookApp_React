import React from "react";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";
import { Link } from "react-router-dom";

class SearchPage extends React.Component {
  state = {
    input: "",
    searchBooks: [],
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.input !== this.state.input) {
      if (this.state.input === "") {
        this.setState({ searchBooks: [] });
        return;
      }
      this.fetchBooks(this.state.input);
    }
  }

  fetchBooks = (input) => {
    BooksAPI.search(input)
      .then((books) => {
        console.log(books);
        if (Array.isArray(books)) {
          this.setState({ searchBooks: books });
        } else {
          this.setState({ searchBooks: [] });
        }
      })
      .catch((err) => console.error("error getting books", err));
  };

  updateInput = (event) => this.setState({ input: event.target.value });

  render() {
    const { books } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search" />
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.updateInput}
            />
          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchBooks.map((book) => (
              <Book
                books={books}
                book={book}
                fetchBooks={this.props.fetchBooks}
                key={book.id}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
