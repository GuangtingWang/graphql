const express = require('express');
// Convention for express-graphql, name is various
const graphqlHTTP = require("express-graphql");
const mongoose = require('mongoose');

const { dbKey } = require('./keys');

console.log(dbKey);
const schema = require('./schema/schema');
const app = express();

mongoose.connect(`mongodb://user:${dbKey}@ds121593.mlab.com:21593/graphql-demo`,
{ useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('Success!');
})

app.use("/graphql",graphqlHTTP({
    // Options, Your Schema Here
    schema,
    graphiql: true
}))







const PORT = process.env.NODE_ENV || 4000;
app.listen(PORT, () => console.log('listening for request on port 4000'));