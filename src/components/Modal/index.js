import { FiX } from 'react-icons/fi';

import './style.css';

export function Modal({conteudo, close}){
    console.log(conteudo);
    //console.log(close);
    
    return(
        <div className='modal'>
            <div className='container'>
                <button className='close' onClick={close}><FiX size={25} color='#FFF' /></button>

                <main>
                    <h2>Questões sobre o livro - {conteudo.titulo}</h2>
                    <ul className='item-quests'>
                        {conteudo.questoes.map((item, index) => {
                            return(
                                <li key={index} className='item-quest'>
                                    {item.question}
                                    <div class="dropdown">
                                        <span>Ver Resposta</span>
                                        <div class="dropdown-content">
                                            <p>{item.status}</p>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </main>
            </div>
        </div>
    )
}