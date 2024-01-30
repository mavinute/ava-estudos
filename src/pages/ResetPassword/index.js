import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail, updatePassword } from 'firebase/auth';
import { toast } from 'react-toastify';

import { auth } from '../../services/firebaseConnect';

import logoImg from '../../assets/logo.png';

import { Container, Login, Form, LoginArea  } from './style';

export function ResetPassword(){
    const [email, setEmail] = useState('');
    //const [password, setPassword] = useState('');

    //const user = auth.getIdToken;
    //const newPassword = password;

    // function createNewPassword(e){
    //     e.preventDefault();
        
    //     updatePassword(user, newPassword)
    //     .then(() => {
    //         alert("senha atualisada")
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // }
    
    function handleCreateNewPassword(e){
        e.preventDefault();

        sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("email foi enviado");
            setEmail("");
            toast.info("Um email foi enviado para sua caixa de emails")
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    return(
        <Container>
            <Login>
                <LoginArea>
                    <img src={logoImg} alt="logo do sistema" />
                </LoginArea>

                <Form onSubmit={handleCreateNewPassword}>
                    <h1>Entrar</h1>
                    <input
                        type="email"
                        placeholder="digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    
                    <button type="submit" >Criar Nova Senha</button>
                    
                </Form>
                
                <Link to="/" >Voltar ao Inicio</Link>
            </Login>
        </Container>
    )
}