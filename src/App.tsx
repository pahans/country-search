import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { API_URL } from './constants';

import Home from './pages/Home';

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Home />
      </div>
    </ApolloProvider>
  );
}

export default App;
