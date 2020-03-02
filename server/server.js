const express = require('express');
const app = express();
const fs = require('fs')
const {ApolloServer} = require('apollo-server-express')
const productDatabase = [];
const resolvers = {
    Query:{
        productList
    },
    Mutation:{
        productAdd
    }    
}
function productList(){
    return productDatabase;
}
function productAdd (_,{product}){
    product.id = productDatabase.length + 1;
    productDatabase.push(product);
    return product;
}
const server = new ApolloServer({
    typeDefs: fs.readFileSync('./server/schema.graphql','utf-8'),
    resolvers,
})
const fileServerMiddleWare = express.static('public');
app.use('/',fileServerMiddleWare);
server.applyMiddleware({app,path:'/graphql'});
app.listen(3000, function(){
    console.log('App started on port 3000');
})