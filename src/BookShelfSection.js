import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelfSection extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    sectionTitle: PropTypes.string.isRequired
  }

  render() {
    const { books, sectionTitle } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{sectionTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => ( <Book book={book} /> ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelfSection