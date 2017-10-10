import React from 'react'
import { Route } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBookShelf = (book, shelf) => {
    if (book.shelf !== shelf) {
      let bookList = this.state.books
      if (book.shelf) {
        // the book is already on the bookshelf, find it and updated it.
        for(var i = 0; i < bookList.length; i++) {
          if (bookList[i].id === book.id) {
            bookList[i].shelf = shelf
            break
          }
        }
      } else {
        // the book is being added to the bookshelf.
        book.shelf = shelf
        bookList.push(book)
      }
      BooksAPI.update(book, shelf)
      this.setState({ books: bookList })
    }
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooks
            books={this.state.books}
            updateBookShelf={this.updateBookShelf}
          />
        )}/>
        <Route exact path="/" render={() => (
          <BookShelf
            books={this.state.books}
            updateBookShelf={this.updateBookShelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
