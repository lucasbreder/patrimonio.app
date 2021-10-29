import styled from 'styled-components'
import Button from './Button'
import Section from './Section'
import TableBody from "./table/TableBody"
import TableHeader from "./table/TableHeader"
import Title from './Title'
import Head from 'next/head'
import stringTranslate from '../helpers/stringTranslate'
import FilterTools from './FilterTools'
import Pagination from './Pagination'
import { useRouter } from 'next/router'

export default function List({ data, slug, meta }) {

    const router = useRouter()

    const exclude = process.env.NEXT_PUBLIC_EXCLUDEFROMLIST

        return (
            <Section>
                <Head>
                    <title>{stringTranslate(slug)} | {process.env.NEXT_PUBLIC_NAME}</title>
                </Head>
                <Title text={slug} />
                <Button type='new' link={`/create/${slug}`} label='Adicionar' />
                <FilterTools />
                {
                    data && data.length > 0 ?
                        <>
                        <Table>
                            <TableHeader data={data} exclude={exclude} slug={slug}/>
                            <TableBody data={data} slug={slug} exclude={exclude} />
                        </Table>
                        <Pagination slug={slug} meta={meta} />
                        </>
                        :
                        <>
                    <p>Nada Encontrado</p>
                    <div onClick={() => router.back()}>
                        <Button type="back" label="Voltar"/>        
                    </div>
                    </>
                    
                }
                
            </Section>
        )
    
        
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