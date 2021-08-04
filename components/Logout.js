import { useRouter } from 'next/router'
import styled from 'styled-components'
import { destroyCookie } from 'nookies'

export default function LogOut() {

    const router = useRouter()
    
    function logout() {
        destroyCookie(null, 'token')
        router.push('/login')
    }
    
    return (
        <LogoutButton onClick={()=> {logout()}}>Sair</LogoutButton>
    )
}

const LogoutButton = styled.div`
    cursor: pointer;
    color: #fff;
    transition: all 1s;
    margin-bottom: 3rem;

    :hover {
        color: ${props => props.theme.featureColor};
    }
`