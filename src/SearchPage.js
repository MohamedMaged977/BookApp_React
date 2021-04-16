import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Link } from "react-router-dom";
class SearchPage extends React.Component {
  state = {
    query: "",
    queryBooks: [],
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      if (this.state.query === "") {
        this.setState({ queryBooks: [] });
        return;
      }
      this.fetchBooks(this.state.query);
    }
  }

  fetchBooks = (input) => {
    BooksAPI.search(input)
      .then((books) => {
        //console.log(books);
        if (Array.isArray(books)) {
          this.setState({ queryBooks: books });
        } else {
          this.setState({ queryBooks: [] });
        }
      })
      .catch((err) => console.error("error getting books", err));
  };
  /*bookMapper = (books) => {
    books.map((book1) => {
      BooksAPI.get(book1.id).then((book) => (book1 = book));
    });
  };
  */
  updateQuery = (event) => this.setState({ query: event.target.value });
  render() {
    const { refPage } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" onClickCapture={() => refPage}>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/dacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.updateQuery}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {console.log(this.state.queryBooks)}
            {this.state.queryBooks.map((book) => {
              return (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url("${book.imageLinks &&
                            book.imageLinks.thumbnail}")`,
                        }}
                      />
                      <div className="book-shelf-changer">
                        <select
                          value={book.shelf ? book.shelf : "None"}
                          onChange={(event) => {
                            BooksAPI.update(book, event.target.value).catch(
                              (err) => console.error("error updating book", err)
                            );
                          }}
                        >
                          <option value="move" disabled>
                            Move to...
                          </option>
                          <option value="currentlyReading">
                            Currently Reading
                          </option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="None">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}
export default SearchPage;
