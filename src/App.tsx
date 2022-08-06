import React, { createContext } from 'react';
import Home from './components/home'
import './App.css';
import { useGoogleLogin } from 'react-use-googlelogin'
import {GoogleAuthProvider, useGoogleAuth} from './context/googleAuth'
import { GameProvider } from './context/games'




function App() {

  
  return (
    <div className="app">
      <GoogleAuthProvider>
        <GameProvider>
          <Home />
        </GameProvider>
      </GoogleAuthProvider>
    </div>
  );
}

export default App;
