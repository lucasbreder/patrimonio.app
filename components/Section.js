import styled from 'styled-components'

export default function Section({ children }) {
    return (
        <SectionContainer>
            {children}
        </SectionContainer>
    )
}

const SectionContainer = styled.section`
    padding: 4rem;
    background-color: ${props => props.theme.backgroundColor};
    box-shadow: -2px 0 5px rgba(0,0,0,0.4);
    flex-basis: 100%;
    overflow: hidden;

    @media (max-width: ${props => props.theme.mobileBreakPoint}) {
        padding: 2rem;
    } 
`