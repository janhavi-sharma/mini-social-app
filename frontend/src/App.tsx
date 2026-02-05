import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthScreen from './components/AuthScreen';
import SocialFeed from './components/SocialFeed';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthScreen />} />
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <SocialFeed />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
