import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { RoutesApp } from './routes';
import { AuthProvider } from './contexts/auth';

import { GlobalStyle } from './styles/global';

export function App(){
  return(
    <BrowserRouter>
    <GlobalStyle />
        <AuthProvider>
          <RoutesApp/>
          <ToastContainer autoClose={3000} />
        </AuthProvider>
    </BrowserRouter>
  )
}
