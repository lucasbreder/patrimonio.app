import styled from 'styled-components'
import QRCode from 'qrcode.react'

export default function QRCodeItem({ data }) {

    console.log(data)
    return (
        <QRCodeContainer>
            <QRCode value={`/details/materials/${data.id}`} />
            <QRTitle>{data.baseMaterial.name}</QRTitle>
        </QRCodeContainer>
        )
    
        
    }

const QRCodeContainer = styled.div`
    padding: 1.5rem;
    margin: .5rem;
    border: 1px solid #ccc;
`

const QRTitle = styled.p`
    font-size: .9rem;
    margin-top: .5rem;
    text-align: center;
`