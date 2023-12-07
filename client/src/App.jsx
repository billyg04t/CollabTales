import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import "./pages/Page's.css"

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="flex-column off-white-background justify-center align-center min-100-vh">
        <Outlet />
      </div>
    </ApolloProvider>
  );
}

export default App;
