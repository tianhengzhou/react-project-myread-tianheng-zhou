/**
 * Created by tzhou on 7/21/17.
 */
import React from 'react';
import { Link } from 'react-router-dom'
import escaspeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

export default class ListBooks extends React.Component {
    state = {
	    query: ''
    };
	updateQuery = (query) => {
        this.setState({
            query: query.trim(),
        });
    };
    clearQuery = () => {
        this.setState({
            query: '',
        });
    };
    render() {
        const { books } = this.props;
        const { query } = this.state;
        let showingBooks;
        if (query) {
            const match = new RegExp(escaspeRegExp(query), 'i');
            console.log(escaspeRegExp(query));
            showingBooks = books.filter((books) => {
                return match.test(books.title)
            })
        } else {
            showingBooks = books
        }
        showingBooks.sort(sortBy('name'));
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
                               value={query}
                               onChange={(event) => this.updateQuery(event.target.value)}/>

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            showingBooks.map(( book ) => (
                                <li key={ book.title }>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover"
                                                 style={{ width: 128, height: 193,
                                                     backgroundImage: `url(${book.imageLinks.thumbnail})`}}/>
                                            <div className="book-shelf-changer">
                                                <select>
                                                    <option value="none" disabled>Move to...</option>
                                                    <option value="currentlyReading">Currently Reading</option>
                                                    <option value="wantToRead">Want to Read</option>
                                                    <option value="read">Read</option>
                                                    <option value="none">None</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{ book.title }</div>
                                        {
                                            book.authors.map((author) => (
                                                <div className="book-authors" key={ author }>{ author }</div>
                                            ))
                                        }
                                    </div>
                                </li>
                            ))
                        }

                    </ol>
                </div>
            </div>
		);
	}
}
