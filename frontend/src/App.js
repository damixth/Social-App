import { Container } from '@material-ui/core'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth'

function App() {

  return (
    <GoogleOAuthProvider clientId='956691324343-8hf3m4pab3anb6dugpfc2aqmkoefm6pm.apps.googleusercontent.com'>
      <BrowserRouter>
        
        <Container maxWidth='lg'>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/auth" exact element={<Auth />} />
          </Routes>
        </Container>

      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
