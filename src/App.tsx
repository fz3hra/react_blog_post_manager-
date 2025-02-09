import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PostList from './components/posts/PostList';
import PostEditor from './components/posts/PostEditor';
import LoginScreen from './components/auth/LoginScreen';
import { AuthProvider } from './components/auth/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import RegisterScreen from './components/auth/RegisterScreen';

function App() {
  return (
   <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <PostList />
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
          <Route path="/editor/:id" element={<PostEditor />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;