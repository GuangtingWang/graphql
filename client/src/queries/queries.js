import {gql} from 'apollo-boost';

export const getBooksQuery = gql`
    {
        books{
           name
           id
           genre
        }
    }
`

export const getAuthorsQuery = gql`
    {
        authors {
            name
            id
            age
        }
    }
`

export const addBookMutation = gql`
    mutation ($name:String!, $genre: String!, $authorId:ID!, $id:ID!) {
        addBook(name: $name, genre: $genre, authorId:$authorId, id:$id){
            name
        }
    }
`

export const getBookQuery = gql` 
    query ($id:ID!) {
        book(id:$id) {
            name
            id
            genre
            author {
                id
                name
                age
                books{
                    name
                    id
                }
            }
        }
    }  
`