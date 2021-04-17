import React from "react";
import * as BooksAPI from "./BooksAPI";

const getBookShelf = (books, book) => {
  const foundBook = books.find((b) => b.id === book.id);
  if (foundBook) {
    return foundBook.shelf;
  }

  return undefined;
};

const Book = (props) => {
  const { books, book, getBooks } = props;
  const { title, authors, imageLinks } = book;

  const bookShelf = book.shelf || getBookShelf(books, book);

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${imageLinks && imageLinks.thumbnail}")`,
          }}
        />
        <div className="book-shelf-changer">
          <select
            value={bookShelf}
            onChange={(event) => {
              BooksAPI.update(book, event.target.value).then(getBooks);
            }}
          >
            <option value="move" disabled>
              Move to...
            </option>
            <option value="none">None</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors}</div>
    </div>
  );
};

export default Book;
