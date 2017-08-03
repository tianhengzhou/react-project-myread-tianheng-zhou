import React, {Component} from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './pages/ListBooks'
import MyReads from './pages/MyReads'

class BooksApp extends Component {
  state = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true
  };
  componentWillMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({
          books: books
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (<ListBooks books={this.state.books}/>)
        }/>
        <Route exact path="/" render={() => {
            return <MyReads/>
        }}/>

      </div>
    )
  }
}

export default BooksApp
