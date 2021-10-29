import styled from 'styled-components'
import Button from './Button'
import Section from './Section'
import Title from './Title'
import Head from 'next/head'
import stringTranslate from '../helpers/stringTranslate'
import FilterTools from './FilterTools'
import ListBoxItem from './ListBoxItem'

export default function ListBox({ data, slug }) {

    if (data) {
        return (
            <Section>
                <Head>
                    <title>{stringTranslate(slug)} | {process.env.NEXT_PUBLIC_NAME}</title>
                </Head>
                <Title text={slug} />
                <Button type='new' link={`/create/${slug}`} label='Adicionar' />
                <FilterTools />
                <ListBoxContainer>
                    {data.map((item, index) => {
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