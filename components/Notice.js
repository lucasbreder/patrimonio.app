import styled from 'styled-components'

export default function Notice({ status }) {

    function showMessage(statusMessage) {

        const messages = {
            '200': 'Criada com sucesso'
        }

        return messages[statusMessage]
    }

    return (
        <NoticeContainer>{showMessage(status)}</NoticeContainer>
    )
}

const NoticeContainer = styled.div`
    margin: 2rem 0;
    border: 1px solid ${props => props.theme.featureColor2};
    border-left: 20px solid ${props => props.theme.featureColor2};
    padding: 1rem 1rem;
    border-radius: 15px;
    color: ${props => props.theme.featureColor2};
    font-weight: bold;
`