/**
 * Created by tzhou on 7/23/17.
 */
import React from 'react';
import { Link } from 'react-router-dom'
import { update, getAll } from '../BooksAPI'
import Shelf from "../components/Shelf";


export default class MyReads extends React.Component {
    state = {
        books: []
    };
    componentDidMount(){
        getAll().then((books) => {
            this.setState({
                books: books
            })
        })
    }
    changeShelf = (book, newShelf) => {
        const bookID = book.id;
        update(book, newShelf).then(() => {
            this.setState({
                books: this.state.books.map((book) => {
                    if (book.id === bookID){
                        book.shelf = newShelf;
                    }
                    return book;
                }),
            });

        });

    };
	render() {
        const reading= this.state.books.filter((book) => book.shelf==='currentlyReading' );
        const wantToRead = this.state.books.filter((book) => book.shelf === 'wantToRead' );
        const read = this.state.books.filter((book) => book.shelf === 'read' );
		return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Shelf title="Currently Reading" books={reading} changeShelf={this.changeShelf}/>
                        <Shelf title="Want to Read" books={wantToRead} changeShelf={this.changeShelf}/>
                        <Shelf title="Read" books={read} changeShelf={this.changeShelf}/>
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>

            </div>
        )
	}
}