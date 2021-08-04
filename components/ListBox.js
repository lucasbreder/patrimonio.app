import styled from 'styled-components'
import Button from './Button'
import Section from './Section'
import Title from './Title'
import Head from 'next/head'
import stringTranslate from '../helpers/stringTranslate'
import { useEffect } from 'react'
import Link from 'next/link'
import ListTools from './ListTools'
import { useRouter } from 'next/router'

export default function ListBox({ data, slug }) {
    console.log(data)
    const router = useRouter()
    const itens = data.length >= 0 ? data : [data]

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
                <ListBoxContainer>
                    {itens.map((item) => {
                        return (
                            <ListBoxItem>
                                <Link href={`/edit/${slug}/${item.id}`}>{item[Object.keys(itens[0])[1]]}</Link>
                                <Additionalnfo>{router.query.slug === 'sublocals' && item.local.name}</Additionalnfo>
                                <ToolsBox>
                                    <ListTools id={item.id} />
                                </ToolsBox>
                            </ListBoxItem>
                        )
                    })}
                </ListBoxContainer>
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

    tr td:first-of-type, tr th:first-of-type {
        max-width: ${props => props.length > 10 ? "100%" : "100px"};
        text-align: ${props => props.length > 10 ? "left" : "center"};
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
    img {
        max-width: 100%;
    }
`
const ListBoxContainer = styled.div`
    display: flex;
    flex-flow: wrap;
`
const ListBoxItem = styled.div`
    border: 1px solid #4D4D4D;
    border-radius: 15px;
    padding: 3rem 2rem;
    margin-right: 1rem;
    text-align: center;
    flex-basis: 20%;
    position: relative;

    a {
        color: #18669E;
        font-weight: bold;
        font-style: italic;
    }
`

const ToolsBox = styled.div`
    position: absolute;
    bottom: -20px;
    right: 20px;
`

const Additionalnfo = styled.div`
    font-size: .9rem;
    margin-top: .5rem;
`