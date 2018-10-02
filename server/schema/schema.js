// Schema defined here
const graphql = require("graphql");

const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLSchema } = graphql;

// fake data
var books = [
    { name:'helloworld',"id": "1", authorId:'1'},
    { name:'how are you',"id": "2", authorId:'2'},
    { name:'goodbye',"id": "3", authorId:'1'},
    { name:'last time',"id": "4", authorId:'3'}
];
var authors = [
    { name:'wang', age:26, id:"1" },
    { name:'huang', age:25, id:"2" },
    { name:'lu', age:24, id:"3" }
]

const BookType = new GraphQLObjectType({
    name:'Book',
    fields:() => ({
        id:{ type: GraphQLID},
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type:AuthorType,
            resolve(parent, args){
                console.log(parent);
                return _.find(authors, {id: parent.authorId});
            }
        }
    })
})


const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields: () => ({
        id:{type: GraphQLString},
        name:{type: GraphQLString},
        age:{type: GraphQLInt},
        books: {
            type: GraphQLList(BookType),
            resolve(parent,args){
                return _.filter(books, {authorId: parent.id})
            }
        }
    })
})

// Root Query
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id:{type: GraphQLID} },
            resolve(parent, args){
                // Code to get data from DB/other source
                return _.find(books, { id: args.id }); 
            }
        },
        author: {
            type: AuthorType,
            args: { id:{type:GraphQLID} },
            resolve(parent, args){
                return _.find(authors, {id: args.id});
            }
        },
        books: {
            type: GraphQLList(BookType),
            resolve(parent,args){
                return books;
            }
        },
        authors: {
            type: GraphQLList(AuthorType),
            resolve(){
                return authors;
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
})
