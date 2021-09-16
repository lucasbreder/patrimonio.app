import styled from 'styled-components'
import Button from './Button'
import Section from './Section'
import Title from './Title'
import Head from 'next/head'
import stringTranslate from '../helpers/stringTranslate'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import ListTools from './ListTools'
import { useRouter } from 'next/router'
import filterSet from '../helpers/filterSet'
import FilterTools from './FilterTools'

export default function ListBox({ data, slug }) {
    const router = useRouter()

    const [itensFiltered, setItensFiltered] = useState()

    const elements = itensFiltered ? itensFiltered : data.length >= 0 ? data : [data]

    const parentItem = useRef(null)

    if (data) {
        return (
            <Section>
                <Head>
                    <title>{stringTranslate(slug)} | {process.env.NEXT_PUBLIC_NAME}</title>
                </Head>
                <Title text={slug} />
                <Button type='new' link={`/create/${slug}`} label='Adicionar' />
                <FilterTools setItensFiltered={setItensFiltered} api={process.env.NEXT_PUBLIC_API + slug} filterSet={filterSet(slug)} />
                <ListBoxContainer>
                    {elements.map((item, index) => {
                        return (
                            <ListBoxItem key={index} ref={parentItem}>
                                <Link href={`/edit/${slug}/${item.id}`}>{item[Object.keys(data[0])[1]]}</Link>
                                <Additionalnfo>{(router.query.slug === 'sublocals' && item.local) && item.local.name}</Additionalnfo>
                                <ToolsBox>
                                    <ListTools id={item.id} parent={parentItem} />
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

    @media (max-width: ${props => props.theme.mobileBreakPoint}) {
        flex-basis: 100%;
        margin: 1rem 0;
    }

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