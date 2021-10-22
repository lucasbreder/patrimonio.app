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
import ListBoxItem from './ListBoxItem'

export default function ListBox({ data, slug }) {

    const [itensFiltered, setItensFiltered] = useState()

    const elements = itensFiltered ? itensFiltered : data.length >= 0 ? data : [data]


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
                            <ListBoxItem key={index} data={item} slug={slug} />
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