import { useContext, useState } from 'react';
import { FiUpload, FiUser } from 'react-icons/fi';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';

import { db, storage } from '../../services/firebaseConnect';
import { Header } from '../../components/Header';
import { Title } from '../../components/Title';

import avatar from '../../assets/avatar.png';
import {AuthContext} from '../../contexts/auth';

import './style.css';

export function Profile(){
    const { user, setUser, storageUser } = useContext(AuthContext);

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
    const [nome, setNome] = useState(user && user.name);
    const [email, setEmail] = useState(user && user.email);
    const [imageAvatar, setImageAvatar] = useState(null);

    function handleFile(e){
        //console.log(e.target.files);

        if(e.target.files[0]){
            const image = e.target.files[0];

            if(image.type === 'image/jpeg' || image.type === 'image/png'){
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(image))
            }else{
                alert("Envie uma imagem no formato JPEG ou PNG");
                setImageAvatar(null);
                return;
            }
        }
    }

    async function handleUpdate(){
        const currentUid = user.uid;

        const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`);

        uploadBytes(uploadRef, imageAvatar)
        .then((snap) => {
            getDownloadURL(snap.ref)
            .then( async(downloadUrl) => {
                let urlFoto = downloadUrl;

                const docRef = doc(db, "users", user.uid)
                await updateDoc(docRef, {
                    avatarUrl: urlFoto,
                    nome: nome
                })
                .then(() => {
                    let data = {
                        ...user,
                        name: nome,
                        avatarUrl: urlFoto
                    }

                    setUser(data);
                    storageUser(data);
                    toast.success("Atualizado com sucesso");
                })
            })
        })
    }

    async function handleSubmit(e){
        e.preventDefault();

        if(imageAvatar === null && nome !== ''){
            //Atualizar foto de perfil
            const docRef = doc(db, "users", user.uid);
            await updateDoc(docRef, {
                name: nome
            })
            .then(() => {
                let data = {
                    ...user,
                    name: nome
                }

                setUser(data);
                storageUser(data);
                toast.success("Atualizado com sucesso!")
            })
            .catch((err) => {
                console.log(err);
            })
        }else if(nome !== '' && imageAvatar !== null) {
            //Atualizar tando o nome como a foto
            handleUpdate();
        }
    }
    
    return(
        <div>
            <Header/>

            <div className="content">
                <Title name="Meu Perfil">
                    <FiUser size={25} />
                </Title>

                <div className="container">
                {/* onSubmit={handleSubmit} */}
                    <form className="form-profile" onSubmit={handleSubmit} >

                    <label className="label-avatar">
                        <span>
                        <FiUpload color="#FFF" size={25} />
                        </span>

                        {/* {avatarUrl === null ? (
                            <img src={avatar} alt="Foto de perfil" width={250} height={250} />
                            ) : (
                            <img src={avatarUrl} alt="Foto de perfil" width={250} height={250} />
                        )} */}

                        <input type="file" accept="image/*" onChange={handleFile} /> <br/>
                        {avatarUrl === null ? (
                        <img src={avatar} alt="Foto de perfil" width={250} height={250} />
                        ) : (
                        <img src={avatarUrl} alt="Foto de perfil" width={250} height={250} />
                        )}

                    </label>

                    <div className='campos'>
                        <label>Nome</label>
                        <input type="text" value={nome} />

                        <label>Email</label>
                        <input type="text" value={email} disabled={true} />
                    </div>

                        <button type="submit" className='btnSalvar'>Salvar</button>
                    
                    </form>

                </div>

            {/* <div className="container">
                <button className="logout-btn" onClick={() => logOut()}>Sair</button>
            </div> */}

            </div>

    </div>
    )
}