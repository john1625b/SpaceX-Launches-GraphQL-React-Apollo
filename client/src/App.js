import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import logo from './SpaceX-logo.png'
import Launches from "./compoments/Launches";
import Launch from "./compoments/Launch";

const client = new ApolloClient({
    uri: '/graphql'
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Router>
                    <div className="container">
                        <img src={logo} alt="SpaceX" style={{width: 300, display: 'block', margin: 'auto'}}/>
                        <Route exact path="/" component={Launches} />
                        <Route exact path="/launch/:flight_number" component={Launch} />
                    </div>
                </Router>
            </ApolloProvider>
        );
    }
}

export default App;
