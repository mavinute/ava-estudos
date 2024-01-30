import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FiCheck } from 'react-icons/fi'
import { getDoc, doc } from  'firebase/firestore'

import { db } from '../../services/firebaseConnect'

import { Header } from '../../components/Header'
import { Title } from '../../components/Title'

import './style.css'

export function Response(){
    const { id } = useParams()

    const [autor, setAutor] = useState()
    const [titulo, setTitulo] = useState()
    const [verify, setVerify] = useState(false)
    const [pergunta1, setPergunta1] = useState()
    const [resposta1, setResposta1] = useState()
    const [pergunta2, setPergunta2] = useState()
    const [resposta2, setResposta2] = useState()
    const [pergunta3, setPergunta3] = useState()
    const [resposta3, setResposta3] = useState()
    const [pergunta4, setPergunta4] = useState()
    const [resposta4, setResposta4] = useState()
    const [pergunta5, setPergunta5] = useState()
    const [resposta5, setResposta5] = useState()
    const [pergunta6, setPergunta6] = useState()
    const [resposta6, setResposta6] = useState()
    const [pergunta7, setPergunta7] = useState()
    const [resposta7, setResposta7] = useState()
    const [pergunta8, setPergunta8] = useState()
    const [resposta8, setResposta8] = useState()
    const [pergunta9, setPergunta9] = useState()
    const [resposta9, setResposta9] = useState()
    const [pergunta10, setPergunta10] = useState()
    const [resposta10, setResposta10] = useState()
    const [pergunta11, setPergunta11] = useState()
    const [resposta11, setResposta11] = useState()

    //const [allQuestions, setAllQuestions] = useState([])
    //console.log(pergunta1 >= '')

    useEffect(() => {
        async function loadData(){
            const docRef = doc(db, "ebooks", id)

            //console.log(docRef)

            await getDoc(docRef)
            .then((snapshot) => {
                //console.log(snapshot.data().questions[0].status)

                setTitulo(snapshot.data().title)
                setAutor(snapshot.data().author)
                setPergunta1(snapshot.data().questions[0].question)
                setResposta1(snapshot.data().questions[0].status)
                setPergunta2(snapshot.data().questions[1].question)
                setResposta2(snapshot.data().questions[1].status)
                setPergunta3(snapshot.data().questions[2].question)
                setResposta3(snapshot.data().questions[2].status)
                setPergunta4(snapshot.data().questions[3].question)
                setResposta4(snapshot.data().questions[3].status)
                setPergunta5(snapshot.data().questions[4].question)
                setResposta5(snapshot.data().questions[4].status)
                setPergunta6(snapshot.data().questions[5].question)
                setResposta6(snapshot.data().questions[5].status)
                setPergunta7(snapshot.data().questions[6].question)
                setResposta7(snapshot.data().questions[6].status)
                setPergunta8(snapshot.data().questions[7].question)
                setResposta8(snapshot.data().questions[7].status)
                setPergunta9(snapshot.data().questions[8].question)
                setResposta9(snapshot.data().questions[8].status)
                setPergunta10(snapshot.data().questions[9].question)
                setResposta10(snapshot.data().questions[9].status)
                setPergunta11(snapshot.data().questions[10].question)
                setResposta11(snapshot.data().questions[10].status)

                // setAllQuestions([
                //     snapshot.data().questions[9].question,
                //     snapshot.data().questions[9].status,
                //     snapshot.data().questions[10].question, 
                //     snapshot.data().questions[10].status
                // ])
            })
            .catch((err) => {
                console.log(err)
            })
        }

        loadData()
    }, [])

    function verifyRespostas(){
        setVerify(true)
    }
    
    return(
        <div>
            <Header/>
                <div className="content">
                    <Title name="Questões">
                        <FiCheck size={25} />
                    </Title>

                    <div className='containerr'>
                        <h1>Questões - Livro {titulo}</h1>
                        <span>Autor: {autor}</span>

                        <div className='container-questions'>

                                {/* {
                                    console.log(pergunta1 === '' ? alert("AAA") : <></>)
                                } */}

                                {!!pergunta1 ? 
                                    <div className='container-section'>
                                        <h3>{pergunta1}</h3>
                                        <div className='container-resposta'>
                                            <input type="radio" />
                                            <label>Verdadeiro</label>
                                            <input type="radio" />
                                            <label>Falso</label>
                                        </div>
                                        <div>
                                            {verify === true ? <span>Resposta Correta é - {resposta1}</span> : <></>}
                                        </div>
                                    </div> :
                                    <></>
                                }

                                {!!pergunta2 ? 
                                    <div className='container-section'>
                                        <h3>{pergunta2}</h3>
                                        <div className='container-resposta'>
                                            <input type="radio" />
                                            <label>Verdadeiro</label>
                                            <input type="radio" />
                                            <label>Falso</label>
                                        </div>
                                        <div>
                                            {verify === true ? <span>Resposta Correta é - {resposta2}</span> : <></>}
                                        </div>
                                    </div> :
                                    <></>
                                }

                                {!!pergunta3 ? 
                                    <div className='container-section'>
                                        <h3>{pergunta3}</h3>
                                        <div className='container-resposta'>
                                            <input type="radio" />
                                            <label>Verdadeiro</label>
                                            <input type="radio" />
                                            <label>Falso</label>
                                        </div>
                                        <div>
                                            {verify === true ? <span>Resposta Correta é - {resposta3}</span> : <></>}
                                        </div>
                                    </div> :
                                    <></>
                                }
                                {!!pergunta4 ? 
                                    <div className='container-section'>
                                        <h3>{pergunta4}</h3>
                                        <div className='container-resposta'>
                                            <input type="radio" />
                                            <label>Verdadeiro</label>
                                            <input type="radio" />
                                            <label>Falso</label>
                                        </div>
                                        <div>
                                            {verify === true ? <span>Resposta Correta é - {resposta4}</span> : <></>}
                                        </div>
                                    </div> :
                                    <></>
                                }
                                {!!pergunta5 ? 
                                    <div className='container-section'>
                                        <h3>{pergunta5}</h3>
                                        <div className='container-resposta'>
                                            <input type="radio" />
                                            <label>Verdadeiro</label>
                                            <input type="radio" />
                                            <label>Falso</label>
                                        </div>
                                        <div>
                                            {verify === true ? <span>Resposta Correta é - {resposta5}</span> : <></>}
                                        </div>
                                    </div> :
                                    <></>
                                }

                                {!!pergunta6 ? 
                                    <div className='container-section'>
                                        <h3>{pergunta6}</h3>
                                        <div className='container-resposta'>
                                            <input type="radio" />
                                            <label>Verdadeiro</label>
                                            <input type="radio" />
                                            <label>Falso</label>
                                        </div>
                                        <div>
                                            {verify === true ? <span>Resposta Correta é - {resposta6}</span> : <></>}
                                        </div>
                                    </div> :
                                    <></>
                                }

                                {!!pergunta7 ?
                                    <div className='container-section'>
                                        <h3>{pergunta7}</h3>
                                        <div className='container-resposta'>
                                            <input type="radio" />
                                            <label>Verdadeiro</label>
                                            <input type="radio" />
                                            <label>Falso</label>
                                        </div>
                                        <div>
                                            {verify === true ? <span>Resposta Correta é - {resposta7}</span> : <></>}
                                        </div>
                                    </div> :
                                    <></>
                                }

                                {!!pergunta8 ? 
                                    <div className='container-section'>
                                        <h3>{pergunta8}</h3>
                                        <div className='container-resposta'>
                                            <input type="radio" />
                                            <label>Verdadeiro</label>
                                            <input type="radio" />
                                            <label>Falso</label>
                                        </div>
                                        <div>
                                            {verify === true ? <span>Resposta Correta é - {resposta8}</span> : <></>}
                                        </div>
                                    </div> :
                                    <></>
                                }

                                {!!pergunta9 ?
                                    <div className='container-section'>
                                        <h3>{pergunta9}</h3>
                                        <div className='container-resposta'>
                                            <input type="radio" />
                                            <label>Verdadeiro</label>
                                            <input type="radio" />
                                            <label>Falso</label>
                                        </div>
                                        <div>
                                            {verify === true ? <span>Resposta Correta é - {resposta9}</span> : <></>}
                                        </div>
                                    </div>
                                    :
                                    <></>
                                }

                                {!!pergunta10 ?
                                    <div className='container-section'>
                                        <h3>{pergunta10}</h3>
                                        <div className='container-resposta'>
                                            <input type="radio" />
                                            <label>Verdadeiro</label>
                                            <input type="radio" />
                                            <label>Falso</label>
                                        </div>
                                        <div>
                                            {verify === true ? <span>Resposta Correta é - {resposta10}</span> : <></>}
                                        </div>
                                    </div> :
                                    <></>
                                }

                                
                                
                                
                            <button className="btn-response" onClick={verifyRespostas} >Verificar Resposta</button>
                        </div>
                    </div>
                </div>
        </div>
    )
}