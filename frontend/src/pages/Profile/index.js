import React, { useState, useEffect } from 'react'; // useEffect serve pra disparar alguma função em determinado momento
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

// importando arquivo css do Register
import './style.css';

// importando imagens
import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    // 2 parâmetros: 1 qual função será executada, 2 que será executada sempre que esses valores mudarem []
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncidents(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });
            // trazendo lista de casos sem o id deletado
            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, {ongName}</span>
                <Link to="/incidents/new" className="button">
                    Cadastrar novo caso
                </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>
                        <strong>VALOR:</strong>
                        {/* formatação de valor em R$ */}
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                        <button onClick={() => handleDeleteIncidents(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8d3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
