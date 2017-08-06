/**
 * Created by tzhou on 7/21/17.
 */
import React from 'react';
import { Link } from 'react-router-dom'
import Shelf from "../components/Shelf";
import { update , search } from '../BooksAPI'
import PropTypes from 'prop-types';



class ListBooks extends React.Component {
    state = {
	    // query: '',
        books: []
    };
	updateQuery = (query) => {
        if (!query){
            this.setState({
                books:[],
            });
        }else {
            search(query, 20).then((books) => {
                if (books.error){
                    this.setState({
                        books: [],
                    });
                }else{

                    this.setState({
                        books: books
                    })
                }
            })
        }
    };
    clearQuery = () => {
        this.setState({
            books: [],
        });
    };
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
        const { books } = this.state;
		return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                         NOTES: The search from BooksAPI is limited to a particular set of search terms.
                         You can find these search terms here:
                         https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                         However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                         you don't find a specific author or title. Every search is limited by search terms.
                         */}
                        <input type="text" placeholder="Search by title or author"
                               onChange={(event) => this.updateQuery(event.target.value)}/>

                    </div>
                </div>
                <Shelf title="Search Result" books={books} changeShelf={this.changeShelf}/>
            </div>
		);
	}
}

ListBooks.propTypes = {
    books: PropTypes.array.isRequired
};

export default ListBooks