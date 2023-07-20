import { useEffect } from 'react'
import './App.css'
import { Contatos } from './components/Contatos'
import { Form } from './components/Form'
import Header from './components/Header'
import { client } from './config/client-graphql'
import { ApolloProvider } from '@apollo/client'
import {ContatosContextProvider} from './context/ContatosContext'

function App() {

  return (
    <ApolloProvider client={client}>
      <div className="container">
        <Header text="Contatos" />
        <ContatosContextProvider>
          <main className="main">
            <Form />
            <Contatos />
          </main>
        </ContatosContextProvider>
      </div>
    </ApolloProvider>
  )
}

export default App
