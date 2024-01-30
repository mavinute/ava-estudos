import { useState, useEffect } from 'react';
import { FiCheck, FiDelete } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { collection, getDoc, getDocs, doc, addDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';

import { db } from '../../services/firebaseConnect';

import { Header } from '../../components/Header';
import { Title } from '../../components/Title';

import './styles.css';

const listRef = collection(db, "ebooks");

export function Questions(){
    
    const [questions, setQuestions] = useState([]);
    const [booksVerify, setBooksVerify] = useState([]);
    const [loadBooks, setLoadBooks] = useState(true);
    const [bookSelected, setBookSelected] = useState(0);
    const [idBook, setIdBook] = useState();

    const [textQuestion, setTextQuestion] = useState('');
    const [status, setStatus] = useState('Falso');
    
    //console.log(questions);
    //console.log(booksVerify);
    //console.log(idBook);

    useEffect(() => {
        async function loadBooks(){
            await getDocs(listRef)
            .then((snapshot) => {
                //console.log(snapshot);

                let lista = [];

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        titulo: doc.data().title,
                        autor: doc.data().author,
                        livro: doc.data().ebookUrl,
                        questoes: doc.data().questions
                    })
                })

                setBooksVerify(lista);
                setLoadBooks(false);
                //console.log(lista);
            })
            .catch((err) => {
                console.log(err);
                setLoadBooks(false);
                setQuestions([]);
            })
        }

        loadBooks();
    }, []);
    
    function handleQuestion(e){
        e.preventDefault();

        if(!textQuestion){
            return toast.error("Preencha todos os campos corretamente!")
        }

        const subQuestion = {
            question: textQuestion,
            status: status
        }

        //console.log(questions);
        setQuestions([...questions, subQuestion]);
        setTextQuestion('');
        toast.success("Questões cadastradas com sucesso")
        //console.log(subQuestion);

    }

    function handleOptionChange(e){
        setStatus(e.target.value);
    }

    async function registerQuestions(e){
        e.preventDefault();

        const docRef = doc(db, "ebooks", idBook);
        await updateDoc(docRef, {
            created: new Date(),
            id: idBook,
            questions: questions
        })
        .then(() => {
            toast.success("Questões cadastradas com sucesso!");
            setQuestions([]);
            setBookSelected(0);
        })
        .catch((err) => {
            console.log(err);
            toast.error("Houve um erro ao cadastrar as questões!")
            setQuestions([]);
            setBookSelected(0);
        })

        //console.log(questions);
        
    }

    function handleChangeBook(e){
        setBookSelected(e.target.value);
        //console.log(booksVerify[e.target.value].id)
        setIdBook(booksVerify[e.target.value].id)
    }

    async function excludQuestion(id){
        await deleteDoc(db, "ebooks", id)
    }
    
    //console.log(questions)

    return(
        <div>
            <Header/>
            <div className='content'>
                <Title name="Questionário">
                    <FiCheck size={25} />
                </Title>
                
                <div className='container'>
                    
                    <form className='form-question' onSubmit={handleQuestion} >
                    <label>Seleciona o livro</label>
                            
                            {loadBooks ? (
                                <input className="input-load" type="text" disabled={true} value="Carregando..." />
                            ) : (
                                <select className="select-load" value={bookSelected} onChange={handleChangeBook} >
                                    {booksVerify.map((item, index) => {
                                        return(
                                            <option className="option-load" key={index} value={index} >{item.titulo}</option>
                                        )
                                    })}
                                </select>
                            )}
                            

                        <label>Questão</label>
                        <textarea
                            className='input-question'
                            placeholder="digite a pergunta..." 
                            type="text" 
                            value={textQuestion} 
                            onChange={(e) => setTextQuestion(e.target.value)} 
                        />
                        <label>Alternativa correta</label>
                        <div className='status'>
                            <input
                                type='radio'
                                name='radio'
                                value='Verdadeiro'
                                onChange={handleOptionChange}
                                checked={ status === 'Verdadeiro'}
                            />
                            <span>Verdadeiro</span>
                            <input
                                type='radio'
                                name='radio'
                                value='Falso'
                                onChange={handleOptionChange}
                                checked={ status === 'Falso' }
                            />
                            <span>Falso</span>
                        </div>
                        <button className='btn-question' type='submit'>Salvar</button>
                    </form>
                    <button className='btn-quetions' type='submit' onClick={registerQuestions} >Cadastrar Questões</button>
                    <ul>
                        {questions.map((i) => (
                            <li className='item-question' key={i.question} >{i.question}</li>
                        ))}
                    </ul>

                    {/* <button onClick={() => excludQuestion(i.id)} ><FiDelete size={20} /></button> */}
                </div>
            </div>
            
        </div>
    )
}