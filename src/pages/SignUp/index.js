import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AuthContext } from '../../contexts/auth';

import { Container, Form, Login, LoginArea } from './style';

import logoImg from '../../assets/logo.png';

export function SignUp(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signUp, loadingAuth } = useContext(AuthContext);

    async function handleSignUp(e){
        e.preventDefault();

        if(email !== '' && password !== '' && nome !== ''){
            await signUp(email, password, nome);
        }else{
            toast.error("Preencha todos os campos corretamente")
        }
    }

    return(
        <Container>
            <Login>
                <LoginArea>
                    <img src={logoImg} alt="logo do sistema" />
                </LoginArea>

                <Form onSubmit={handleSignUp}>
                    <h1>Cadastrar</h1>
                    <input
                        type="text"
                        placeholder="digite seu nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="digite seu senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit" >{loadingAuth ? "Cadastrando..." : "Cadastre-se"}</button>
                    
                </Form>

                <Link to="/" >Já tenho cadastro, voltar!</Link>
            </Login>
        </Container>
    )
}