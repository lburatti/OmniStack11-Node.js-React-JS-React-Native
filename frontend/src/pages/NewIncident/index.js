import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

// importando arquivo css do Register
import './style.css';

// importando imagens
import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
    // guardando valores dos inputs em states
    const [title, setTitle] = useState(''); // inicialmente vazio
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault(); // para não recarregar pagina quando clicamos em enviar o form
        const data = {
            title,
            description,
            value
        };
        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            });
            history.push('/profile'); // após será enviado para pagina profile
        } catch (err) {
            alert('Erro ao cadastrar caso, tente novamente.');
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título do caso" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição" 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em reais" 
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
