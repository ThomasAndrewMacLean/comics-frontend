import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for routes
import Home from '../routes/home';
import OverviewComics from '../routes/overviewComics';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

let client;

if (typeof window !== 'undefined') {
  client = new ApolloClient({
    uri:
      window.location.hostname === 'localhost'
        ? 'http://localhost:3000/graphql'
        : 'https://comicgraphql.now.sh'
  });
} else {
  client = new ApolloClient({
    uri: 'https://comicgraphql.now.sh'
  });
}

export default class App extends Component {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <div id='app'>
          <Header />
          <Router onChange={this.handleRoute}>
            <Home path='/' />
            <OverviewComics path='/profile/' user='me' />
            <OverviewComics path='/profile/:user' />
          </Router>
        </div>
      </ApolloProvider>
    );
  }
}
