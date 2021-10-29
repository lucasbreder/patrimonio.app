import Link from 'next/link'
import styled from 'styled-components'

export default function Button({ type, label, link, onClick }) {
    switch (type) {
        case "submit":
            return (
                <ButtonSubmit onClick={onClick}>{label}</ButtonSubmit>
            )
        case "new":
            return (
                <ButtonContainer onClick={onClick}>
                    <Link href={link}>{label}</Link>
                </ButtonContainer>
            )
        case "back":
            return (
                <BackButtonContainer onClick={onClick}>
                  {label}
                </BackButtonContainer>
            )
    }
    
}
const ButtonContainer = styled.div`
    display: inline-block;
    margin: 2rem 0;
        a {
            color: #fff;
            font-weight: bold;
            padding: 1rem;
            border-radius: 50px;
            background-color: ${props => props.theme.featureColor2};
            text-align: center;
        }
`

const BackButtonContainer = styled.div`
    color: #fff;
    font-weight: 800;
    padding: 1rem;
    border-radius: 50px;
    background-color: ${props => props.theme.featureColor2};
    text-align: center;
    display: inline-block;
    cursor: pointer;
`

const ButtonSubmit = styled.button`
    display: block;
    padding: 1rem 2rem;
    border-radius: 50px;
    background-color: ${props => props.theme.featureColor2};
    text-align: center;
    color: #fff;
    font-weight: bold;
    border: none;
    margin: 0 auto;
    font-family: inherit;
    cursor: pointer;
    transition: all 1s;

    :hover {
        filter: blur(.1);
    }
`