import React, { useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import logo from '../../assets/logo.svg';

import './styles.css';

const NewIncident: React.FC = () => {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    const ongId = localStorage.getItem('ongId');

    try {
      await api.post(`/incidents/`, data, {
        headers: {
          Authorization: ongId,
        },
      });

      history.push('/profile');
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert('Erro ao cadastrar o caso, tente novamente.');
    }
  };

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logo} alt="Be The Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Titulo do caso"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};
export default NewIncident;
