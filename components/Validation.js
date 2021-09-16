import styled from "styled-components"
import findValidation from "../helpers/findValidation"

export default function Validation({ validation, name }) {
    
    return (
        <ValidationContainer>{findValidation(validation, name)}</ValidationContainer>
    )

   
}

const ValidationContainer = styled.p`
    margin-top: .5rem;
    font-style: .9rem;
    color: ${props => props.theme.featureColor2};
`