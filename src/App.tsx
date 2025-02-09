import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PostList from './components/posts/PostList';
import PostEditor from './components/posts/PostEditor';
import LoginScreen from './components/auth/LoginScreen';
import { AuthProvider } from './components/auth/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  return (
    // <BrowserRouter>
   <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <PostList posts={[]} />
              </PrivateRoute>
            }
          />
          <Route
            path="/editor"
            element={
              <PrivateRoute>
                <PostEditor />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
    
    
  );
}

export default App;