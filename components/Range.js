import styled from "styled-components"

export default function Range({ number }) {

    const rows = [1,2,3,4,5]
    
    return (
        <RangeContainer>
            {
                rows.map((item, index) => {
                    return index < number ? <RangeItemActive/> : <RangeItem/>
                })
            }
        </RangeContainer>
    )
    
}

const RangeContainer = styled.div`
    display: flex;
`

const RangeItem = styled.div`
    border-radius: 100%;
    background-color: #D9D9D9;
    width: 25px;
    height: 25px;
    margin-right: .5rem;
`

const RangeItemActive = styled.div`
    border-radius: 100%;
    background-color: ${props => props.theme.featureColor};
    width: 25px;
    height: 25px;
    margin-right: .5rem;
`