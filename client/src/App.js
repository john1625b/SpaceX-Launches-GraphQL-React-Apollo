import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo'
import './App.css';
import logo from './SpaceX-logo.png'
import Launches from "./compoments/Launches";

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql'
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <div className="App">
                    <img src={logo} alt="SpaceX" style={{width: 300, display: 'block', margin: 'auto'}}/>
                </div>
                <Launches/>
            </ApolloProvider>
        );
    }
}

export default App;
