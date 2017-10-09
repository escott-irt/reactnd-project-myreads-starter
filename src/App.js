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
    let bookList = this.state.books
    for(var i = 0; i < bookList.length; i++) {
      if (bookList[i].id === book.id) {
        bookList[i].shelf = shelf
        break
      }
    }
    this.setState(bookList)
    BooksAPI.update(book, shelf)
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooks/>
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
