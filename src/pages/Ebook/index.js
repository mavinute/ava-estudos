import { useState } from 'react';
import { FiBook, FiUpload } from 'react-icons/fi';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';

import { db, storage } from '../../services/firebaseConnect';

import { Header } from '../../components/Header';
import { Title } from '../../components/Title';

import uploadImg from '../../assets/upload.png';
import booksImg from '../../assets/books.png';

import './style.css';

export function Ebook(){
    
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [imageAvatar, setImageAvatar] = useState(null);
    const [numberBook, setNumberBook] = useState(0);
    
    function handleFile(e){
        //console.log(e.target.files[0]);
        //console.log(avatarUrl);

        const ebook = e.target.files[0];
            if(ebook.type === 'application/pdf'){
                //console.log(imageAvatar);
                setImageAvatar(ebook);
                setAvatarUrl(URL.createObjectURL(ebook))
                toast.success("Livro carregado com sucesso, agora preencha os demais campos")
            }else{
                setImageAvatar(null);
                toast.error("Envio um arquivo do tipo PDF")
                return 
            }
    }

    async function handleSubmit(e){
        e.preventDefault();

        if(avatarUrl !== null && titulo !== '' && autor !== ''){

            //const currentUid = Math.random();

            const uploadRef = ref(storage, `books/${imageAvatar.name}`);

            await uploadBytes(uploadRef, imageAvatar)
            .then((snapshot) => {

                getDownloadURL(snapshot.ref)
                .then(async (downloadURL) => {
                    let urlFoto = downloadURL;

                    //const docRef = doc(db, "ebooks");
                    await addDoc(collection(db, "ebooks"), {
                        ebookUrl: urlFoto,
                        title: titulo,
                        author: autor,
                        created: new Date(),
                        count: numberBook
                    })
                })

                toast.success("Cadastrado com sucesso")
                setAutor('');
                setTitulo('');
                setImageAvatar(null);
            })
            .catch((err) => {
                console.log(err)
            })

        }else {
           toast.error("Impossível cadastrar o livro sem preencher todos os campos") 
        }
    }
    
    return(
        <div >
            <Header/>

            <div className="content">
                <Title name="Cadastro de Livros">
                    <FiBook size={25} />
                </Title>
                <div className='container'>
                    <form className="form-ebook" onSubmit={handleSubmit}>
                        <label className="label-avatar">
                            <span>
                                <FiUpload size={25} color="#DDD" />
                            </span>
                            <input type="file" accept="application/pdf" onChange={handleFile} /><br/>
                            {avatarUrl === null ? (
                                <img src={uploadImg} alt="foto do livro" width={250} height={250} />
                            ):(
                                <img src={booksImg} alt="foto do livro" width={250} height={250} />
                            )}
                        </label>
                        <label>Livro</label>
                        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                        <label className="label-autor">Autor</label>
                        <input type="text" value={autor} onChange={(e) => setAutor(e.target.value)} />
                        <button type="submit">Salvar</button>
                    </form>

                </div>

            </div>

        </div>
    )
}