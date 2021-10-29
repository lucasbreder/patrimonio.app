import styled from 'styled-components'
import QRCode from 'qrcode.react'

export default function QRCodeItem({ data }) {

    console.log(data)
    return (
        <QRCodeContainer>
            <QRCode value={`/details/materials/${data.id}`} />
            <QRTitle>{data.baseMaterial.name}</QRTitle>
            <QRNumber>{data.identification_number}</QRNumber>
        </QRCodeContainer>
        )
    
        
    }

const QRCodeContainer = styled.div`
    padding: 1.5rem;
    margin: .5rem;
    border: 1px solid #ccc;
    flex-basis: 10%;
    background-color: #fff;
`

const QRTitle = styled.span`
    display: block;
    font-size: .7rem;
    margin-top: .5rem;
    text-align: center;
    width: 100%;
    margin-bottom: .5rem;
`

const QRNumber = styled.p`
    display: block;
    text-align: center;
`