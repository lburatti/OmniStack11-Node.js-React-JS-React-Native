import React, { useState } from 'react';
// importando componente LINK do react-router-dom
import { Link, useHistory } from 'react-router-dom';
// importando pacote de icons do react -> react-icons/FONTE DE ICONS (fi: feather icons)
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

// importando arquivo css do Login
import './style.css';
// importando imagens
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Login() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault(); // para não recarregar pagina quando clicamos em enviar o form

        try {
            const response = await api.post('sessions', { id });
            // salvando dados da ONG logada
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            // redirecionando pra rota profile da ONG logada
            history.push('/profile');
        } catch {
            alert('Falha no login, tente novamente.');
        }
    }

    return (
        <div className="login-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>
                    
                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="#e02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}
