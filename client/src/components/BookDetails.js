import React, { Component } from 'react'
import {graphql} from 'react-apollo';
import { getBookQuery } from '../queries/queries';

class BookDetails extends Component {

    displayBookDetail = () => {
        const {book} = this.props.data;
        if(book) {
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by the author:</p>
                    <ul className='other-books'>
                        {book.author.books.map(book => <li key={book.id}>{book.name}</li>)}
                    </ul>
                </div>
            )
        }
        else {
            return (
                <div>No book found</div>
            )
        }
    }

  render() {
    return (
      <div id='book-details'>
        <p>Book Details:</p>
        {this.displayBookDetail()}
      </div>
    )
  }
}
export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id:props.bookId
            }
        }
    }
})(BookDetails);