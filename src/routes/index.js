import { Routes, Route } from 'react-router-dom';

import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { ResetPassword } from '../pages/ResetPassword';
import { Dashboard } from '../pages/Dashboard';
import { Profile } from '../pages/Profile';
import { Ebook } from '../pages/Ebook';
import { Questions } from '../pages/Questions';
import { Ranking } from '../pages/Ranking';
import { Response } from '../pages/Response';

import { Private } from '../contexts/Private';

export function RoutesApp(){
    return(
        <Routes>
            <Route path='/' element={<SignIn/>} />
            <Route path='/cadastro' element={<SignUp />} />
            <Route path='/ambiente' element={<Private><Dashboard /></Private>} />
            <Route path='/perfil' element={<Private><Profile/></Private>} />
            <Route path='/cadastrodelivro' element={<Private><Ebook/></Private>} />
            <Route path='/cadastrodelivro/:id' element={<Private><Ebook/></Private>} />
            <Route path='/questionarios' element={<Private><Questions/></Private>} />
            <Route path='/ranking' element={<Private><Ranking/></Private>} />
            <Route path='/visualizar-questionario/:id' element={<Private><Response/></Private>} />
            <Route path="/esqueci-a-senha" element={<ResetPassword/>} />
        </Routes>
    )
}