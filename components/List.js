import styled from 'styled-components'
import Button from './Button'
import Section from './Section'
import TableBody from "./table/TableBody"
import TableHeader from "./table/TableHeader"
import Title from './Title'
import Head from 'next/head'
import stringTranslate from '../helpers/stringTranslate'
import { useEffect, useState } from 'react'

export default function List({ data, slug }) {
    const [length, setLenght] = useState()

    const itens = data.length >= 0 ? data : [data]
    const exclude = process.env.NEXT_PUBLIC_EXCLUDEFROMLIST

    useEffect(() => {

    })

    if (itens.length > 0) {
        return (
            <Section>
                <Head>
                    <title>{stringTranslate(slug)} | {process.env.NEXT_PUBLIC_NAME}</title>
                </Head>
                <Title text={slug} />
                <Button type='new' link={`/create/${slug}`} label='Adicionar' />
                <Table length={length}>
                    <TableHeader data={itens} exclude={exclude} length={length}/>
                    <TableBody data={itens} slug={slug} exclude={exclude} length={length}/>
                </Table>
            </Section>
        )

    } else {
        return (
            <Section>
                <Title text={slug} />
                <Button type='new' link={`/create/${slug}`} label='Adicionar o Primeiro' />
                <p>Nada Encontrado</p>
            </Section>

        )
        
        
    }
}

const Table = styled.table`
    width: 100%;
    border-radius: 20px;
    display: flex;
    flex-flow: column;

    tr {
        justify-content: flex-start;
    }

    th, td {
        padding: 2rem;
        max-width: auto;
        overflow: hidden;
        
        @media (max-width: ${props => props.theme.mobileBreakPoint}) {
            padding: 1rem 2rem;
            max-width: 100%;
            overflow: visible;
        }
    }
`