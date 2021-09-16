import styled from "styled-components"

export default function Home() {

  return (
    <Dashboard>
        <Title>Olá, seja bem vindo ao seu sistema de gerenciamento, escolha uma das opções ao lado</Title>
    </Dashboard>
  )	
}

const Dashboard = styled.div`
  padding: 15rem;

  @media (max-width: ${props => props.theme.mobileBreakPoint}) {
    padding: 2rem;
  }
`

const Title = styled.h1`
background-image: linear-gradient(45deg, ${props => props.theme.gradientColor1}, ${props => props.theme.gradientColor2});
  font-size: 2rem;
  font-weight: bold;
  line-height: 2.5rem;
  color: #fff;
  padding: 3rem;
  border-radius: 20px;
  text-align: center;
  width: 40%;
  margin: 0 auto;

      @media (max-width: ${props => props.theme.mobileBreakPoint}) {
        width: 80%;
        font-size: 1.5rem;
    } 
`