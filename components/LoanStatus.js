import styled from "styled-components"


export default function LoanStatus({ date, status }) {

    const today = new Date()
    const loanDevolution = new Date(date)

    if (status !== 'Cedido') {
        return <LoanTag status='#18669E'>Devolvido</LoanTag>
    } else {
        if (loanDevolution < today) {
            return <LoanTag status='#9E1818'>Atrasado</LoanTag>
        } else {
            return <LoanTag status={props => props.theme.featureColor}>Cedido</LoanTag>
        }
    }

}

const LoanTag = styled.span`
    display: inline-block;
    background-color: ${props => props.status};
    text-align: center;
    padding: 1rem;
    color: #fff;
    font-size: .9rem;
    border-radius: 40px;
    font-weight: bold;
    word-break: keep-all;
`