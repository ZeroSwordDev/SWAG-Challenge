import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import "./App.css";
import { CartProvider } from "./context/Cart";
import { CartWrapper } from "./components/Wrapper";
import { ToastContainer } from "react-toastify";
import { QuoteProvider } from "./context/Form";
import { QuoteSimulatorModal } from "./components/QuoteSimulatorModal";

function App() {
  return (
    <div className="App">
      <CartProvider>
        <QuoteProvider>
          <Header />
          <CartWrapper />
          <main>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
          </main>
          <QuoteSimulatorModal />
          <ToastContainer position="bottom-right" toastClassName="toast" />
        </QuoteProvider>
      </CartProvider>
    </div>
  );
}

export default App;
