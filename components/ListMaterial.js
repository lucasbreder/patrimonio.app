import styled from 'styled-components'
import Button from './Button'
import Section from './Section'
import TableBody from "./table/TableBody"
import TableHeader from "./table/TableHeader"
import Title from './Title'
import Head from 'next/head'
import stringTranslate from '../helpers/stringTranslate'
import { useState, useEffect } from 'react'
import FilterTools from './FilterTools'
import filterSet from '../helpers/filterSet'
import { useRouter } from "next/router";
import Pagination from './Pagination'
import { parseCookies } from 'nookies'
import axios from 'axios'
import ListLoan from './ListLoan'

export default function ListMaterial({ data, slug, meta }) {

    const [itensFiltered, setItensFiltered] = useState()
    const [loanMaterial, setLoanMaterial] = useState()

    const router = useRouter()

    useEffect(() => {
        const handleRouteChange = () => {
            setItensFiltered()
        }

        router.events.on('routeChangeComplete', handleRouteChange)


    }, )
    

    const exclude = process.env.NEXT_PUBLIC_EXCLUDEFROMLIST

        return (
            <Section>
                <Head>
                    <title>{stringTranslate(slug)} | {process.env.NEXT_PUBLIC_NAME}</title>
                </Head>
                <Title text={slug} />
                <Button type='new' link={`/create/${slug}`} label='Adicionar' />
                <FilterTools setItensFiltered={setItensFiltered} api={process.env.NEXT_PUBLIC_API + slug} filterSet={filterSet(slug)} />
                {
                    itensFiltered || data ?
                    <Table>
                        <TableHeader data={data} exclude={exclude} />
                        <TableBody data={itensFiltered ? itensFiltered : data} slug={slug} exclude={exclude} />
                    </Table>
                    :
                    <p>Nada Encontrado...</p>
                }
                <Pagination meta={meta} api={process.env.NEXT_PUBLIC_API + slug} setItensFiltered={setItensFiltered} />

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