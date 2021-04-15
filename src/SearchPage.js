import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Link } from "react-router-dom";
class SearchPage extends React.Component {
  state = {
    query: "",
    queryBooks: [],
  };
  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim(),
    }));
  };
  getBooks = (query) => {
    BooksAPI.search(query).then((bookss) => {
      this.setState(() => ({
        queryBooks: bookss,
      }));
      console.log(bookss);
    });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      if (this.state.query === "") {
        this.setState({ queryBooks: [] });
        return;
      }
      this.getBooks(this.state.input);
    }
  }
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {console.log(this.state.queryBooks)}
            {this.state.queryBooks.map((book) => {
              return (
                <li key={book.title}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: book.imageLinks.thumbnail
                            ? `url("${book.imageLinks.thumbnail}")`
                            : {},
                        }}
                      />
                      <div className="book-shelf-changer">
                        <select
                          value={book.shelf}
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
