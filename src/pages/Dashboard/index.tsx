import React, { useState, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';
import imageLogo from '../../assets/logo.svg';

import { Title, Form, Repositories, Error } from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [inputSearch, setInputSearch] = useState('');
  const [inputError, setInputError] = useState('');

  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@githubexplorer:repositories',
    );
    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@githubexplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!inputSearch) {
      setInputError('Digite Autor/Nome do repositorio.');
      return;
    }
    try {
      const respose = await api.get<Repository>(`repos/${inputSearch}`);

      const repository = respose.data;

      setRepositories([...repositories, repository]);
      setInputSearch('');
      setInputError('');
    } catch (err) {
      setInputError('Erro na busca por esse repositorio.');
    }
  }

  return (
    <>
      <img src={imageLogo} alt="Github Explorer" />
      <Title>Explore Repositorios no Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          placeholder="Digite aqui"
          value={inputSearch}
          onChange={e => setInputSearch(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      <Repositories>
        {repositories.map(repository => (
          <Link
            key={repository.full_name}
            to={`/repository/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={25} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
