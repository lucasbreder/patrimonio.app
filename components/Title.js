import styled from 'styled-components'
import stringTranslate from '../helpers/stringTranslate'

export default function Title({ text, variant }) {
    return (
        <TitleContainer>
            {stringTranslate(text)}
        </TitleContainer>
    )
}

const TitleContainer = styled.section`
    font-size: 2rem;
    font-weight: bold;
    text-transform: capitalize;
`