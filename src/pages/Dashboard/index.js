import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import { FiHome, FiBook, FiDelete, FiCheck } from 'react-icons/fi';
import { collection, getDocs, orderBy, limit, startAfter, query, doc, deleteDoc, updateDoc } from 'firebase/firestore';

import { db } from '../../services/firebaseConnect';
import { AuthContext } from '../../contexts/auth';

import { Header } from '../../components/Header';
import { Title } from '../../components/Title';
import { Modal } from '../../components/Modal';

import './style.css';
import { toast } from 'react-toastify';

const listRef = collection(db, "ebooks");

export function Dashboard(){
    const { user, setUser, storageUser, countBook, setCountBook } = useContext(AuthContext);
    
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isEmpty, setIsEmpty] = useState(false);
    const [lastBooks, setLastBooks] = useState();
    const [loadingMore, setLoadingMore] = useState(false);

    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState();
    //const [questions, setQuestions] = useState();
    const [countView, setCountView] = useState(0);

    //console.log(detail);
    //console.log(books);
    //console.log(questions);

    useEffect(() => {
        async function loadBooks(){
            const q = await query(listRef, orderBy('created', 'desc'), limit(3));

            const querySnapshot = await getDocs(q);
            setBooks([]);
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
                    titulo: doc.data().title,
                    autor: doc.data().author,
                    livro: doc.data().ebookUrl,
                    questoes: doc.data().questions,
                    contador: doc.data().count
                })
            })

            const lastBook = querySnapshot.docs[querySnapshot.docs.length - 1] //Pegando o ultimo item

            //console.log(lastDoc);
            //console.log(lista)

            setBooks(books => [...books, ...lista]);
            setLastBooks(lastBook);
        }else {
            setIsEmpty(true);
        }

        setLoadingMore(false);
    }

    async function handleMore(){
        //alert("teste");

        setLoadingMore(true);

        const q = query(listRef, orderBy('created', 'desc'), startAfter(lastBooks), limit(1));
        const querySnapshot = await getDocs(q);
        await updateState(querySnapshot);
    }

    async function deleteBook(id){
        const docRef = doc(db, "ebooks", id);

        await deleteDoc(docRef)
        .then(() => {
            toast.info("Livro apagado com sucesso. Atualize a pagina!");
        })
        .catch((err) => {
            console.log(err);
        })
    }

    function taggleBook(item){
        //console.log(item);
        //const urlImage = "https://avatars.githubusercontent.com/u/135439410?v=4";

        //window.open(urlImage, "_blank");
        window.open(item.livro, "_blank");
        //"toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=800,height=800"
        //handleEventClick(item);

    }

    // async function handleEventClick(item){
    //     //console.log(item);
    //     const countViewBook = item.contador += 1;
    //     //console.log(countViewBook);

    //     const docRef = doc(db, "users", user.uid);
    //     await updateDoc(docRef, {
    //         count: countViewBook
    //     })
    //     .then(() => {
    //         let data = {
    //             ...user,
    //             count: countViewBook
    //         }

    //         setCountBook(data);
    //         storageUser(data);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    // }

    function taggleModal(item){
        //console.log(questions);
        //console.log(item);
        
        setShowPostModal(!showPostModal);
        setDetail(item);
        
        // if(item.id === questions.id){
        //     setShowPostModal(!showPostModal);
        //     setDetail(item);
        // }

        //getQuestions
    }

    // async function getQuestions(){
    //     const refQuestions = collection(db, "questions");

    //     await getDocs(refQuestions)
    //     .then((snapshot) => {
    //         let lista = [];

    //         snapshot.forEach((doc) => {
    //             lista.push({
    //                 id: doc.id,
    //                 questoes: doc.data().questions
    //             })
    //         })

    //         setQuestions(lista);
    //         //console.log(lista[1]);
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // }

    if(loading){
        return(
            <div>
                <Header />

                <div className='content'>
                    <Title name="Carregando...">
                        <FiHome size={25} />
                    </Title>

                    <div className='container dashboard'>
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
                <Title name="Inicio">
                    <FiHome size={25} />
                </Title>

                {books.length === 0 ? (
                    <div className='container dashboard'>
                        <h3>Nunhum livro encontrado...</h3>
                    </div>
                ): (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th scope='col' >Título</th>
                                    <th scope='col' >Autor</th>
                                    <th scope='col'>Ler / Responder /Apagar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map((item, index) => {
                                    return(
                                        <tr key={index}>
                                            <td data-label="Título" >{item.titulo}</td>
                                            <td data-label="Autor" >{item.autor}</td>
                                            <td data-label="Ler">
                                                <button className="action" style={{ marginRight: 5 }} onClick={() => taggleBook(item)} ><FiBook size={25} /></button>
                                                <Link to={`/visualizar-questionario/${item.id}`}>
                                                    <button className="action" style={{ marginRight: 5 }} onClick={() => taggleModal(item)} ><FiCheck size={25} /></button>
                                                </Link>
                                                <button className="action" style={{ marginRight: 5 }} onClick={() => deleteBook(item.id)}><FiDelete size={25} /></button>
                                            </td>
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

            { showPostModal && (
                <Modal
                    conteudo={detail}
                    close={() => setShowPostModal(!showPostModal)} 
                />
            )}

        </div>
    )
}