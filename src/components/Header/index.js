import { useContext } from 'react';
import { FiHome, FiUser, FiPower, FiBook, FiCheck, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/auth';

import avatarImg from '../../assets/avatar.png';

import './style.css';

export function Header(){
    const { user, logOut } = useContext(AuthContext);
    
    return(
        <div className='sidebar'>
            <div>
                <img src={ user.avatarUrl === null ? avatarImg : user.avatarUrl } alt="avatar do usuario" />
            </div>
            
                <Link to="/ambiente">
                    <FiHome color="#DDD" size={24} />
                        Inicio
                </Link>
                <Link to="/cadastrodelivro">
                    <FiBook color="#DDD" size={24} />
                        Livros
                </Link>
                <Link to="/questionarios">
                    <FiCheck color="#DDD" size={24} />
                        Questionários
                </Link>
                <Link to="/ranking" >
                    <FiStar color="#DDD" size={25} />
                    Ranking de Leitores
                </Link>
                <Link to="/perfil">
                    <FiUser color="#DDD" size={24} />
                        Perfil
                </Link>
                <Link onClick={() => logOut()}>
                    <FiPower color="#DDD" size={24} />
                    Sair
                </Link>

        </div>
    )
}