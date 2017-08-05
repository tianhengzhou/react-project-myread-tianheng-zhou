/**
 * Created by tzhou on 7/24/17.
 */
import React from 'react';
import PropTypes from 'prop-types';

class Book extends React.Component {

	updateBook = (event) => {
		const newShelf = event.target.value;
		if (this.props.book.shelf !== newShelf){
			this.props.changeShelf(this.props.book, newShelf)
		}
	};
	render() {
		const book = this.props.book;
		return (
			<div className="book">
				<div className="book-top">
					<div className="book-cover" style={{ width: 128, height: 193,
						backgroundImage: `url(${book.imageLinks.thumbnail})` }}/>
					<div className="book-shelf-changer">
						<select onChange={(event) => { this.updateBook(event) }} value={book.shelf}>
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
						<div className="book-authors" key={author}>{author}</div>
                    ))
                }
			</div>
		);
	}
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    changeShelf: PropTypes.func.isRequired
};

export default Book;
