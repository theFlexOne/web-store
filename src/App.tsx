import Routes from './router/Routes';
import AuthProvider from './context/auth/AuthContext';
import ProductsProvider from './context/products/ProductsContext';

function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <Routes />
      </ProductsProvider>
    </AuthProvider>
  );
}

export default App;
