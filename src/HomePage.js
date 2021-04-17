import React from "react";
import Book from "./Book";
import { Link } from "react-router-dom";
const shelfMapper = {
  currentlyReading: "Currently Reading",
  wantToRead: "Want To Read",
  read: "Read",
};

class HomePage extends React.Component {
  componentDidMount() {
    this.props.getBooks();
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
              {Object.keys(shelfMapper).map((key) => {
                const shelfBooks = books.filter((book) => book.shelf === key);
                return (
                  <div className="bookshelf" key={key}>
                    <h2 className="bookshelf-title">{shelfMapper[key]}</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {shelfBooks.map((book) => (
                          <Book
                            books={books}
                            book={book}
                            getBooks={this.props.getBooks}
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
