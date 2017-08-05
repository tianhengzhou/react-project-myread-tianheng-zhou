import React, {Component} from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './pages/ListBooks'
import MyReads from './pages/MyReads'

class BooksApp extends Component {
  state = {
    books: [],
  };
  componentDidMount(){
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
            return <MyReads  books={this.state.books}/>
        }}/>

      </div>
    )
  }
}

export default BooksApp
