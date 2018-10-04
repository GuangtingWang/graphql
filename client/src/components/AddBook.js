import React, { Component } from 'react'

import {graphql, compose} from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

class AddBook extends Component {


    state = {
        name:'',
        genre:'',
        id:'',
        authorId:''
    }

    displayAuthors = () => {
        let data = this.props.getAuthorsQuery;
        if(data.loading){
            return (<option disabled>Loading Authors...</option>)
        }
        else {
            return (
                data.authors.map(author => <option value={author.id} key={author.id}>{author.name}</option>)
            )
        }
    }

    submitForm = (e) => {
        e.preventDefault();
        this.props.addBookMutation({
            variables:{
                name:this.state.name,
                genre:this.state.genre,
                authorId:this.state.authorId,
                id:this.state.id
            },
            refetchQueries:[{query:getBooksQuery}]
        });
        this.setState({name:'',genre:''});
    }

  render() {
    return (
      <div>

      <form id='add-book' onSubmit={this.submitForm}>
      
        <div className='field'>
            <label>Book name:</label>
            <input type='text' value={ this.state.name} onChange={e => this.setState({name: e.target.value})} />
        </div>


        <div className='field'>
            <label>Genre:</label>
            <input type='text' value={this.state.genre} onChange={e => this.setState({genre: e.target.value})} />
        </div>

        <div className='field'>
            <label>book id:</label>
            <input type='text' value={this.state.id} onChange={e => this.setState({id: e.target.value})} />
        </div>

        <div className='field'>
            <label>Author:</label>
            <select onChange={e => this.setState({authorId: e.target.value})}>
                <option>Please select one author</option>
                {this.displayAuthors()}
            </select>
        </div>

        <button>+</button>

      </form>
        
      </div>
    )
  }
}

export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);