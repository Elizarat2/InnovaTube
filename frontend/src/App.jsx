import { AlertProvider } from './context/AlertContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AlertProvider>
          <Navbar />
          {/* ... resto del código */}
        </AlertProvider>
      </AuthProvider>
    </Router>
  );
}