const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`

    type Pessoa {

        nome: String
        idade: Int
        profissao: String
    }

    type Query {

        ola: String
        nome: String
        pessoa: Pessoa
    }


`

const resolvers = {

    Query: {

        ola() {

            return 'Hello graphql'
        },

        nome() {

            return 'Leonardo Porto'
        },

        pessoa() {

            return {

                nome: "Kiko Loureiro",
                idade: 45,
                profissao: "músico"
            }
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