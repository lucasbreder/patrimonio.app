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
import TableColumnGallery from './table/TableColumnGallery'
import { BackgroundImage } from '../styles/mixins'

export default function ListImages({ data, slug }) {
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
                                <Image key={index} src={process.env.NEXT_PUBLIC_NAME_STORAGEBASEURL + item.path} />
                                <ImageName>{item.path}</ImageName>
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

const ListBoxContainer = styled.div`
    display: flex;
    flex-flow: wrap;
    
`
const ListBoxItem = styled.div`
    border-radius: 15px;
    margin: 1rem;
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

const Image = styled.div`
    ${BackgroundImage}
    background-color: #fff;
    background-image: url(${props => props.src});
    background-size: auto 80%;
    width: 100%;
    height: 300px;
    border-radius: 15px;
`

const ImageName = styled.div`
    font-size: .8rem;
    color:#4d4d4d;
    width: 100%;
    text-align: left;
    margin-top: .5rem;
`