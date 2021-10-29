import styled from 'styled-components'
import Section from './Section'
import Title from './Title'
import Head from 'next/head'
import QRCodeItem from './QRCode'

export default function ListQRCode({ data }) {


        return (
            <Section>
                <Head>
                    <title> QR Code dos Material | {process.env.NEXT_PUBLIC_NAME}</title>
                </Head>
                <Title text='QR Code dos Material' />
                <QRCodeList>
                {data.map((item, index) => {
                    return <QRCodeItem key={index} data={item} />
                })}
                </QRCodeList>
            </Section>
        )
    
        
    }

const QRCodeList = styled.table`
    display: flex;
    flex-wrap: wrap;
`