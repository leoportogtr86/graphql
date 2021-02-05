const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`

    type Query {

        ola: String
        nome: String
    }


`

const resolvers = {

    Query: {

        ola() {

            return 'Hello graphql'
        },

        nome() {

            return 'Leonardo Porto'
        }
    }



}

const server = new ApolloServer({

    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {

    console.log('Online em ' + url)
})