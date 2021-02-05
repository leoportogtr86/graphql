const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`



    type Produto {

        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float
    }

    type Carro {

    marca: String
    modelo: String
    preco: Float
    cor: String
    novo: Boolean
    
    }

    type Pessoa {

        nome: String
        idade: Int
        profissao: String
    }




    type Query {

        ola: String
        nome: String
        pessoa: Pessoa
        carro: Carro
        produtoEmDestaque: Produto
    }



`

const resolvers = {

    Produto: {

        precoComDesconto(e) {

            return e.preco - (e.preco * e.desconto / 100)
        }


    },

    Carro: {

        novo(e) {

            return e.unicoDono


        }
    },

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
        },

        carro() {

            return {

                marca: 'Land Rover',
                modelo: 'Range Rover Evoque',
                preco: 350000,
                cor: 'branco',
                unicoDono: false
            }
        },

        produtoEmDestaque() {

            return {

                nome: 'Mac Book Air',
                preco: 15000,
                desconto: 10
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