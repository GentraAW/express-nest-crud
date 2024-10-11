import LandingPage from './pages/Landing';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/Dashboard/Dashboard';
import CustomerPage from './pages/Customer/CustomerPage';
import FoodPage from './pages/Food/FoodPage';
import TransactionPage from './pages/Transaction/TransactionPage';
import { FrameworkProvider } from './utils/FrameworkContext';

function App() {
  return (
    <FrameworkProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/customer" element={<CustomerPage />} />
          <Route path="/food" element={<FoodPage />} />
          <Route path="/transaction" element={<TransactionPage />} />
        </Routes>
      </Router>
    </FrameworkProvider>
  );
}

export default App;
