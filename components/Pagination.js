import { useState } from "react"
import styled from "styled-components"
import nookies from 'nookies'
import axios from "axios"
import { useRouter } from "next/router"
import Button from "./Button"

export default function Pagination({ meta, api, setItensFiltered, slug }) {

    const router = useRouter()

    const pages = []

    const [activePage, setActivePage] = useState(meta.current_page)

    
    for (let index = 1; index < meta.last_page+1; index++) {
        pages.push(index) 
    }

    async function pager(page) {
        router.query.page = page > 0 ? page : 1
        router.push(router)
        setActivePage(page)
    }

    async function showAll() {
        router.query.perPage = 'all'
        router.push(router)
    }
    if (meta) {
        return (
            <>
                <Total>Total: {meta.total}</Total>
                { pages.length > 1 &&
            <PagesContainer>
            {router.query.page > 1 && <PageNav onClick={() => {pager(activePage-1)}}> {'<'} </PageNav>}
            {pages.map((page, index) => {
                return <Pageitem className={activePage === page && 'active'} key={index} onClick={() => {pager(page)}}>{page}</Pageitem>
            })}
                    {router.query.page < pages.length && <PageNav onClick={() => { pager(activePage + 1) }}> {'>'} </PageNav>}
                    
            </PagesContainer>
            
                }
                {pages.length > 1 && <Button type="submit" label="Ver Tudo" onClick={() => showAll()} />}
                </>
        )
    } else {
        return ''
    }

}

const Total = styled.div`
    font-size: 1.1rem;
    font-weight: bold;
    margin-top: .5rem;
    text-align: center;
`
const PagesContainer = styled.div`
    margin: .5rem 0;
    display: flex;
    justify-content:center;
`

const Pageitem = styled.div`
    margin: .5rem;
    cursor: pointer;
    background-color: ${props => props.theme.featureColor2};
    color: #fff;
    padding: .5rem;
    text-align: center;
    font-weight: bold;
    border-radius: 5px;
    align-items: center;

    &.active {
        background-color: ${props => props.theme.featureColor};
    }
`

const PageNav = styled.div`
    margin: .5rem;
    cursor: pointer;
    background-color: ${props => props.theme.featureColor2};
    color: #fff;
    padding: .5rem;
    text-align: center;
    font-weight: bold;
    border-radius: 5px;
`