import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #121212;
    padding: 0 12px;
`;

export const Login = styled.div`
    background-color: #EAEAEC;
    width: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    a {
        margin: 20px;
        color: #111;
        font-size: 15px;
        font-weight: bold;
    }
`;

export const LoginArea = styled.div`
    background-color: #181c2e;
    width: 100%;
    display: flex;
    justify-content: center;

    img {
        width: 200px;
        height: 170px;
        padding: 20px;
    }
`;

export const Form = styled.form`
    margin-top: 10px;
    width: 90%;
    display: flex;
    flex-direction: column;

    h1 {
        text-align: center;
        margin-bottom: 10px;
        color: #181c2e;
    }

    input {
        margin-bottom: 20px;
        height: 35px;
        border-radius: 5px;
        border: 0;
        padding: 10px;
        font-size: 15px;
        background-color: #FFF;
    }

    button {
        height: 35px;
        border: 0;
        border-radius: 5px;
        background-color: #181c2e;
        color: #DDD;
        font-size: 15px;
        font-weight: bold;
    }
`;

export const Line = styled.p`
    margin: 5px;
    font-size: 15px;
    color: #34495E;
    display: flex;
    align-items: center;
`

export const ButtonGoogle = styled.button`
    position: relative;
    
    width: 90%;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #A93226;
    border: 0;
    border-radius: 5px;

    color: #DDD;
    font-size: 15px;
    font-weight: bold;

    img {
        padding: 10px;
    }

`