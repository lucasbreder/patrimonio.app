import styled from 'styled-components'
import Button from './Button'
import Section from './Section'
import TableBody from "./table/TableBody"
import TableHeader from "./table/TableHeader"
import Title from './Title'
import Head from 'next/head'
import stringTranslate from '../helpers/stringTranslate'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import ListTools from './ListTools'
import Moment from 'react-moment'
import 'moment-timezone';
import LoanStatus from './LoanStatus'
import FilterTools from './FilterTools'
import filterSet from '../helpers/filterSet'
import dateFilterSet from '../helpers/dateFilterSet'
import TableColumnTitleMobile from './table/TableColumnTitleMobile'

export default function ListLoan({ data, slug }) {

    const headers = ['Título', 'Origem > Destino', 'Responsável', 'Devolução', 'Status']

    const [itensFiltered, setItensFiltered] = useState(data.length >= 0 ? data : [data]) 
    const exclude = process.env.NEXT_PUBLIC_EXCLUDEFROMLIST

    useEffect(() => {

    })

    if (itensFiltered.length > 0) {
        return (
            <Section>
                <Head>
                    <title>{stringTranslate(slug)} | {process.env.NEXT_PUBLIC_NAME}</title>
                </Head>
                <Title text={slug} />
                <Button type='new' link={`/create/${slug}`} label='Adicionar' />
                <FilterTools setItensFiltered={setItensFiltered} api={process.env.NEXT_PUBLIC_API + slug} filterSet={filterSet(slug)} dateFilterSet={dateFilterSet(slug)} />
                <Table length={length}>
                    <TableHeader data={headers} exclude={exclude} />
                    <TableBodyContainer>
                    {
                        itensFiltered.map((item, index) => {
                            return (
                                
                                <tr key={index}>
                                    <LoanMaterial>
                                        <TableColumnTitleMobile title={headers[0]}/>
                                        <LoanMaterialName>{item.material.baseMaterial.name}</LoanMaterialName>
                                        <LoanMaterialUser>{item.material.identification_number}</LoanMaterialUser>
                                    </LoanMaterial>
                                    <LoanUnits>
                                        <TableColumnTitleMobile title={headers[1]}/>
                                        <LoanUnitOrigin>{item.unit.name}</LoanUnitOrigin>
                                        <LoanUnitDestination>{item.destination_unit.name}</LoanUnitDestination>
                                    </LoanUnits>
                                    <LoanResponsible>
                                        <TableColumnTitleMobile title={headers[2]}/>
                                        {item.destination_user.registry}
                                    </LoanResponsible>
                                    <LoanDevolution>
                                        <TableColumnTitleMobile title={headers[3]}/>
                                        <Moment format="DD/MM/YYYY">{item.devolution_at}</Moment>
                                    </LoanDevolution>
                                    <LoanStatusColumn>
                                        <TableColumnTitleMobile title={headers[4]}/>
                                        <LoanStatus date={item.devolution_at} status={item.material.status} ></LoanStatus>
                                    </LoanStatusColumn>
                                    <td>
                                        <ListTools id={item.id} />
                                    </td>
                                    </tr>
                                    
                            )
                     })
                        }
                        </TableBodyContainer>
                </Table>
            </Section>
        )

    } else {
        return (
            <Section>
                <Title text={slug} />
                <Button type='new' link={`/create/${slug}`} label='Adicionar' />
                <FilterTools setItensFiltered={setItensFiltered} api={process.env.NEXT_PUBLIC_API + slug} filterSet={filterSet(slug)} dateFilterSet={dateFilterSet(slug)} />
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
        display: flex;
    }

    th, td {
        padding: 2rem;
        max-width: auto;
        overflow: hidden;
        flex: 1 1 0;
        
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
const LoanMaterial = styled.td`

`
const LoanMaterialName = styled.span`
    color: ${props => props.theme.featureColor};
    font-weight: bold;
    display: block;
    font-size: 1.5rem;
    font-style: italic;
    margin-bottom: .5rem;

`
const LoanMaterialUser = styled.span`
    display: block;
    font-size: .9rem;
`

const LoanUnits = styled.td`
    font-weight: bold;
    font-size: 3rem;
    font-style: italic;
`
const LoanUnitOrigin = styled.span`
    padding-right: 3rem;
    background-image: url('/icons/arrow.svg');
    background-repeat: no-repeat;
    background-position: center right;

`
const LoanUnitDestination = styled.span`
    padding-left: 1rem;
`

const LoanResponsible = styled.td`
    font-weight: bold;
    font-size: 1.1rem;
`

const LoanDevolution = styled.td`
    font-weight: bold;
    font-size: 1.1rem;
`

const LoanStatusColumn = styled.td`
    
`

const TableBodyContainer = styled.tbody`
        box-shadow: 0 0 1px rgba(0,0,0,.2);
        border-radius: 10px 10px 0 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

    tr {
        display: flex;
        ${props => props.length > 10 ? "flex-flow: column;" : ""}
        border-bottom: ${props => props.theme.fadeColor} 1px solid;

        @media (max-width: ${props => props.theme.mobileBreakPoint}) {
            flex-flow: column;
            border-bottom: 2px solid #ccc;
        } 
    }
    
    tr:first-of-type td:first-of-type {
        border-radius: 10px 0 0 0;
    }
    tr:first-of-type td:last-of-type {
        border-radius: 0 10px 0 0;
    }
    tr:last-of-type {
        border-bottom: 3px solid ${props => props.theme.featureColor};
    }
    tr td:nth-of-type(1) {
        color: ${props => props.theme.featureColor};
        font-weight: 900;

        @media (max-width: ${props => props.theme.mobileBreakPoint}) {
            font-size: 2rem;
        }
    }
    tr td {
        background-color: ${props => props.theme.tableBackgroundColor};
        transition: all .3s;
        ${props => props.length > 10 ? "padding: 1rem 2rem;" : ""}
        flex: ${props => props.length > 10 ? "auto" : "1 1 0 "};
    }
    tr:hover td {
        background-color: ${props => props.theme.backgroundColor};
    }
    tr td img {
        border-radius: 10px;
        vertical-align: middle;

        @media (max-width: ${props => props.theme.mobileBreakPoint}) {
            max-width: 100%;
        } 
    }
    span {
        display: ${props => props.length > 10 ? "block" : "auto"};
    }
`