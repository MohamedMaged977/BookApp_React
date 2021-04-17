import React from "react";
import Book from "./Book";
import { Link } from "react-router-dom";
const shelfNameMapper = {
  currentlyReading: "Currently Reading",
  wantToRead: "Want To Read",
  read: "Read",
};

class HomePage extends React.Component {
  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    const { books } = this.props;
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {Object.keys(books).map((key) => {
                const shelfBooks = books[key];
                return (
                  <div className="bookshelf" key={key}>
                    <h2 className="bookshelf-title">{shelfNameMapper[key]}</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {shelfBooks.map((book) => (
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
              })}
            </div>
          </div>

          <div>
            <Link to="/search" className="open-search" />
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
