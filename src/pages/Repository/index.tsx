import React, { useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';
import imageLogo from '../../assets/logo.svg';

import { Header, RepositoryInfo, Issues } from './styles';

interface RepositoryParams {
  repository: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    api.get(`repos/${params.repository}`).then(response => {
      console.log(response.data);
    });

    api.get(`repos/${params.repository}/issues`).then(response => {
      console.log(response.data);
    });
  }, []);

  return (
    <>
      <Header>
        <img src={imageLogo} alt="Github Explorer" />
        <Link to="/dashboard">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>
      <RepositoryInfo>
        <header>
          <img
            src="https://avatars0.githubusercontent.com/u/6345799?v=4"
            alt="joaogamin"
          />
          <div>
            <strong>joaogamin/coceitos-react</strong>
            <p>Descrição do repositorio.</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>1800</strong>
            <p>Stars</p>
          </li>
          <li>
            <strong>48</strong>
            <p>Forks</p>
          </li>
          <li>
            <strong>67</strong>
            <p>Issues abertas</p>
          </li>
        </ul>
      </RepositoryInfo>
      <Issues>
        <Link to="sadsa">
          <div>
            <strong>dashusdahusda</strong>
            <p>sdahusdahusdahu a udasd</p>
          </div>
          <FiChevronRight size={25} />
        </Link>
      </Issues>
    </>
  );
};

export default Repository;
