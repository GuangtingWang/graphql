import React, { Component } from 'react'
import {graphql} from 'react-apollo';

import { getBooksQuery } from '../queries/queries';

import BookDetails from '../components/BookDetails';

class BookList extends Component {

  state = {
    selected: null
  }

  render() {
  
    return (
      <div>
        <ul id='book-list'>
            {this.props.data.loading === true ? 
                'Loading' : 
                this.props.data.books.map(book => <li 
                  key={book.id}
                  onClick={ e => this.setState({selected:book.id}) }
                  >{book.name}</li>)
            }
        </ul>
        <BookDetails bookId={this.state.selected}/>
      </div>
    )
  }
}
// all books stored in the props.data
export default graphql(getBooksQuery)(BookList);