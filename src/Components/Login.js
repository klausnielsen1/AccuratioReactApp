// src/components/Login.js
import React, { useState } from 'react';

const Login = () => {
  // Estado local para almacenar el correo electrónico y la contraseña
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estado para manejar mensajes de error
  const [error, setError] = useState('');

  // Manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault(); // Evita que la página se recargue

    // Validar que los campos no estén vacíos
    if (!email || !password) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    // Aquí agregarías la lógica para autenticar al usuario
    console.log('Iniciando sesión con:', { email, password });

    // Limpiar los campos y el error después de enviar el formulario
    setEmail('');
    setPassword('');
    setError('');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Iniciar Sesión</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Correo Electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

// Estilos simples para el componente
const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    textAlign: 'center', // Asegura que el texto esté centrado
  },
  title: {
    marginBottom: '1rem',
    color: '#333', // Asegura que el título sea visible
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '1rem',
    textAlign: 'left', // Asegura que las etiquetas se alineen a la izquierda
  },
  label: {
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    color: '#333', // Asegura que las etiquetas sean visibles
  },
  input: {
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%',
  },
  button: {
    padding: '0.5rem',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007BFF',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '1rem',
  },
};

export default Login;

