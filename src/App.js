import Inicio from './Components/Inicio'
import './App.css';
import Login from './Components/Login';
import {Link, Router, BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter className="App">
      <header className="App-header">
        
        <p>
          Accuratio
        </p>
        <p>
        Power Bi Embebbed
        </p>  
        
        
        <Login/>
        <Link to={'/Inicio'} onClick={'Inicio.js'}>
        Inicio 
        </Link>
      </header>
    <Routes>
    <Route path="/" element={<Inicio />} />
    </Routes>


    </BrowserRouter>
    
  );
}

export default App;
