import axios from "axios"
import { useState } from "react"
import styled from 'styled-components'
import Button from "./Button"
import { useRouter } from 'next/router'
import nookies from 'nookies'

export default function Login() {

    const router = useRouter()
    const [loginResult, setLoginResult] = useState()

    async function singin(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const login = await axios.post(`${process.env.NEXT_PUBLIC_API}login`, formData)

        if (login.status == 200) {
            nookies.set(null, 'token', login.data.token, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
              })
    
            router.push('/')
        } else {
            console.log('ts')
            setLoginResult('falha')
        }


    }


    return (
        <LoginPage>
            <LoginContainer>
                <LoginTitle>{process.env.NEXT_PUBLIC_NAME}</LoginTitle>
                <form onSubmit={(event) => {singin(event)}}>
                    <input placeholder="Matricula" type="text" name="registry" autoComplete='username' />
                    <input  placeholder="Senha" type="password" name="password" autoComplete='current-password' />
                    <Button type="submit" label="Entrar" />
                    <p>{loginResult}</p>
                </form>
                
            </LoginContainer>
        </LoginPage>
        )
    
}

const LoginPage = styled.div`
    width: 100%;
    height: 100%;
    background-image: linear-gradient(45deg, ${props => props.theme.featureColor}, ${props => props.theme.featureColor2});
`

const LoginContainer = styled.div`
    width: 20vw;
    height: 30vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @media (max-width: ${props => props.theme.mobileBreakPoint}) {
        width: 80vw;
        height: 50vh;
    }  

    form {
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
        padding: 2rem;
        background-color: ${props => props.theme.backgroundColor};

        input {
            margin: 1rem 0;
            width: 100%;
            border-radius: 10px;
            padding: 1rem;
            border: none;
            border-left: 0 solid ${props => props.theme.featureColor};;
            font-family: inherit;
            outline: none;
            transition: all .5s ease-in-out;
        }
    }
    

`

const LoginTitle = styled.div`
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2rem;
    font-weight: 900;
    color: ${props => props.theme.backgroundColor};
`
