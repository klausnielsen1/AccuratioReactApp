import Inicio from './Components/Inicio'
import './App.css';
import {Auth0Provider} from '@auth0/auth0-react'
import {Link, Router, BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginButton from './Components/loginButton';
import LogoutButton from './Components/LogoutButton';
import Profile from './Components/Profile';
import {useAuth0} from '@auth0/auth0-react'



function App() {
  const {isLoading, error } = useAuth0();
  return (
    <main>
    {error && <p>Error de Autenticación</p>}
    {!error && isLoading && <p>Cargando...</p>}
    {!error && !isLoading && (
      <>
      <LoginButton/>
      <LogoutButton/>
      <Profile/>
      </>
    )}
    
    </main>
    
  );
}

export default App;
