const { ApolloServer, gql } = require('apollo-server')

const people = require('./models/people')
const guitars = require('./models/guitarras')
const cars = require('./models/car')
const vendas = require('./models/venda')
const clients = require('./models/clientes')
const instrumentos_dados = require('./models/instrumento')


const typeDefs = gql`



    type Query {
        
        ola: String
        nome: String
        pessoa: Pessoa
        carro: Carro
        produtoEmDestaque: Produto
        linguagens: [String]
        pessoas: [Pessoa]
        guitarra: [Guitarra]
        carros: [Carro]
        escala: Escala
        venda(id: Int): Venda
        cliente(nome: String): Cliente
        instrumento(nome: String): Instrumento
    }

    type Instrumento {

        nome: String
        tipo: String
        marca: String
        modelo: String
    }

    type Venda {

        id: Int
        produto: String
        nome_vendedor: String
        valor: Float
        data: String
    }


    type Escala {

        tonica: String
        segunda: String
        terca: String
        quarta: String
        quinta: String
        sexta: String
        setima: String
        campoHarmonico: String
    }

    type Guitarra {

        marca: String
        modelo: String
        preco: Float
    }



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

    type Cliente {

        nome: String
        idade: Int
        descricaoProjeto: String
        valorConsultoria: Float
    }







`

const resolvers = {




    Escala: {

        campoHarmonico(e) {

            return 'C7M Dm7 Em7 F7M G7 Am7 Bm7(b5)'


        }
    },

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

        escala() {

            return {

                tonica: 'C',
                segunda: 'D',
                terca: 'E',
                quarta: 'F',
                quinta: 'G',
                sexta: 'A',
                setima: 'B'
            }
        },

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
        },

        linguagens() {

            return ['java', 'javascript', 'c', 'c++', 'c#', 'python', 'ruby', 'scala', 'golang']
        },

        pessoas() {

            return people
        },

        guitarra() {

            return guitars
        },

        carros() {

            return cars
        },

        venda(_, args) {

            const escolhido = vendas.filter(e => e.id == args.id)

            return escolhido[0]


        },

        cliente(_, { nome }) {

            let data = clients.filter(e => e.nome == nome)

            return data[0]


        },

        instrumento(_, { nome }) {

            let data = instrumentos_dados.filter(e => e.nome == nome)

            return data[0]


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