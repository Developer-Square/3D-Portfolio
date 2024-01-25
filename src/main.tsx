import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import App from './App';
import './index.css';

const client = new ApolloClient({
  uri: 'https://api-eu-west-2.hygraph.com/v2/cl93rprfe474l01tcdu78gvjk/master',
  cache: new InMemoryCache(),
});

//@ts-ignore
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
