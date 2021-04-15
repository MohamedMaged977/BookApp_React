import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
const shelfNameMapper = {
  currentlyReading: "Currently Reading",
  wantToRead: "Want To Read",
  read: "Read",
};

class BookShelf extends React.Component {
  /* onChangeHandler = (event) => {
        setLoading();
        BooksAPI.update(book, event.target.value)
          .then(fetchBooks)
          .catch((err) => console.error("error updating book", err))
          .finally(clearLoading);
      }
     */

  render() {
    const { books, shelf, refPage } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfNameMapper[shelf]}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => {
              return (
                <li key={book.title}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url("${
                            book.imageLinks.thumbnail
                          }")`,
                        }}
                      />
                      <div className="book-shelf-changer">
                        <select
                          value={shelf}
                          onChange={(event) => {
                            BooksAPI.update(book, event.target.value)
                              .then(refPage)
                              .catch((err) =>
                                console.error("error updating book", err)
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

export default BookShelf;
