import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

// importando arquivo css do Register
import './style.css';

// importando imagens
import logoImg from '../../assets/logo.svg';

export default function Register() {
    // guardando valores dos inputs em states
    const [name, setName] = useState(''); // inicialmente vazio
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault(); // para não recarregar pagina quando clicamos em enviar o form
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };
        try {
            const response = await api.post('ongs', data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/'); // após será enviado para pagina inicial
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }   
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link to="/" className="back-link">
                        <FiArrowLeft size={16} color="#e02041" />
                        Já tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    {/* propriedade: value = nome do campo / onChange = enviando valor digitado */}
                    <input
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />
                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input
                            placeholder="UF"
                            syle={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
