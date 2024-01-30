import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AuthContext } from '../../contexts/auth';

import { Container, Login, Form, LoginArea, Line, ButtonGoogle  } from './style';

import logoImg from '../../assets/logo.png';
import logoGoogle from '../../assets/google-icon.svg';

export function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn, loadingAuth, signInWithGoogle } = useContext(AuthContext);

    async function handleSignIn(e){
        e.preventDefault();

        if(email !== '' || password !== ''){
            //console.log(email, password)
            await signIn(email, password);
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

                <Form onSubmit={handleSignIn}>
                    <h1>Entrar - Para Administradores</h1>
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

                    
                    <button type="submit" >{loadingAuth ? "Acessando..." : "Acessar"}</button>
                    
                </Form>
                <Link to="/esqueci-a-senha" >Esqueci a senha</Link>
                <Line>ou</Line>
                <ButtonGoogle type="submit" onClick={signInWithGoogle} ><img src={logoGoogle} alt="google" />Acessar com Google</ButtonGoogle>
                <Link to="/cadastro" >Criar conta agora</Link>
            </Login>
        </Container>
    )
}