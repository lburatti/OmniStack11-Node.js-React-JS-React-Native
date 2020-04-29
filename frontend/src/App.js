// SEMPRE importar o REACT no inicio, para utilização do JSX (incluir {useState} quando necessário)
import React from 'react';

import './global.css';
// importando Routes (OBS: não precisa indicar aquivo, só a pasta -> ele já vai procurar o arquivo JS) // Login está nas ROUTES
import Routes from './routes';

// quando usamos HTML no JS, é chamado JSX: JavaScript + XML

function App() {
  return (
    <Routes />
  )
}

export default App;
