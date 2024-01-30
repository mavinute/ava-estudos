import { useState, useEffect } from 'react';
import { FiStar } from 'react-icons/fi';
import { collection, query, orderBy, limit, getDocs, updateState, startAfter } from 'firebase/firestore';

import { db } from '../../services/firebaseConnect';
import { Header } from '../../components/Header';
import { Title } from '../../components/Title';

import './style.css';

const listRef = collection(db, "users");

export function Ranking(){
    const [rankingUser, setRankingUser] = useState([]);
    const [loading, setLoading] = useState(true);

    const [lastUsers, setLastUsers] = useState();
    const [isEmpty, setIsEmpty] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    
    useEffect(() => {
        async function loadBooks(){
            const q = await query(listRef, orderBy('count', 'desc'), limit(10));

            const querySnapshot = await getDocs(q);
            setRankingUser([]);
            await updateState(querySnapshot);

            setLoading(false);
        }

        loadBooks();

        return () => {

        }
    }, [])

    function updateState(querySnapshot){
        const isCollectionEmpty = querySnapshot.size === 0;

        if(!isCollectionEmpty){
            let lista = [];

            querySnapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    email: doc.data().email,
                    nome: doc.data().name,
                    contador: doc.data().count
                })
            })

            const lastBook = querySnapshot.docs[querySnapshot.docs.length - 1] //Pegando o ultimo item

            //console.log(lastDoc);
            //console.log(lista)

            setRankingUser(rankingUser => [...rankingUser, ...lista]);
            setLastUsers(lastBook);
        }else {
            setIsEmpty(true);
        }

        setLoadingMore(false);
    }

    async function handleMore(){
        //alert("teste");

        setLoadingMore(true);

        const q = query(listRef, orderBy('count', 'asc'), startAfter(lastUsers), limit(1));
        const querySnapshot = await getDocs(q);
        await updateState(querySnapshot);
    }

    if(loading){
        return(
            <div>
                <Header />

                <div className='content'>
                    <Title name="Carregando...">
                        <FiStar size={25} />
                    </Title>

                    <div className='containerr dashboard'>
                        <h3>Carregando Lista de Livros...</h3>
                    </div>
                </div>
            </div>
        )
    }
    
    return(
        <div>
            <Header/>

            <div className="content">
                <Title name="Ranking">
                    <FiStar size={25} />
                </Title>

                {rankingUser.length === 0 ? (
                    <div className='containerr dashboard'>
                        <h3>Nunhum livro encontrado...</h3>
                    </div>
                ): (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th scope='col' >Nome</th>
                                    <th scope='col' >Quantidade de Livros</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rankingUser.map((item, index) => {
                                    return(
                                        <tr key={index}>
                                            <td data-label="Nome" >{item.nome}</td>
                                            <td data-label="Contador" >{item.contador}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        {loadingMore && <h3>Buscando mais livros...</h3>}
                        {!loadingMore && !isEmpty && <button className='btn-more' onClick={handleMore} >Buscar Mais</button>}
                    </>
                    )}
                
            </div>
        </div>
    )
}