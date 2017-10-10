import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {

  state = {
    query: '',
    matchingBooks: []
  }

  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired
  }

  updateQuery = (query) => {
    if (query.trim().length > 0) {
      BooksAPI.search(query.trim(), 20).then((books) => {
        this.setState({ matchingBooks: books })
      })
    } else {
      this.setState({ matchingBooks: [] })
    }
    this.setState({ query: query.trim() })
  }

  render() {
    const { query, matchingBooks } = this.state
    const { books, updateBookShelf } = this.props

    let searchResults = matchingBooks
    if (searchResults.length > 0 && books.length > 0) {
      for(var i = 0; i < searchResults.length; i++) {
        for (var j = 0; j < books.length; j++) {
          if (searchResults[i].id === books[j].id) {
            searchResults[i].shelf = books[j].shelf
            break
          }
        }
      }
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {matchingBooks.length > 0 ? matchingBooks.map((book) => (
              <Book
                key={book.id}
                book={book}
                updateBookShelf={updateBookShelf}
              />
            )) : ''}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
