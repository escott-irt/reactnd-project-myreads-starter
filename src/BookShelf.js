import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import BookShelfSection from './BookShelfSection'

class BookShelf extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired
  }

  render() {
    const { books, updateBookShelf } = this.props

    console.log(books)

    let currentBooks = books.filter((book) => book.shelf === 'currentlyReading')
    currentBooks.sort(sortBy('title'))
    console.log(currentBooks)

    let futureBooks = books.filter((book) => book.shelf === 'wantToRead')
    futureBooks.sort(sortBy('title'))
    console.log(futureBooks)

    let pastBooks = books.filter((book) => book.shelf === 'read')
    pastBooks.sort(sortBy('title'))
    console.log(pastBooks)

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelfSection
              books={currentBooks}
              sectionTitle='Currently Reading'
              updateBookShelf={updateBookShelf}
            />
            <BookShelfSection
              books={futureBooks}
              sectionTitle='Want to Read'
              updateBookShelf={updateBookShelf}
            />
            <BookShelfSection
              books={pastBooks}
              sectionTitle='Read'
              updateBookShelf={updateBookShelf}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BookShelf
