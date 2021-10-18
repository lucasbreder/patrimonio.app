import { useState } from "react/cjs/react.development"
import styled from "styled-components"
import nookies from 'nookies'
import axios from "axios"

export default function Pagination({ meta, api, setItensFiltered }) {

    const pages = []

    const [activePage, setActivePage] = useState(meta.current_page)

    for (let index = 1; index < meta.last_page+1; index++) {
        pages.push(index) 
    }
    console.log(pages)

    async function pager(api, page) {
        const cookies = nookies.get()

        if (page > meta.last_page) {
            page = 1
        }

        if (page < 1) {
            page = meta.last_page
        }
        
        const res = await axios.get(api+'?page='+page, {
          headers: {
            'Authorization': `bearer ${cookies.token}`
          }
        })
        const resData = await res.data.data
        
        setItensFiltered(resData)
        setActivePage(page)
        
    }
    if (meta) {
        return (
            <>
            <Total>Total: {meta.total}</Total>
            <PagesContainer>
                <PageNav onClick={() => {pager(api, activePage-1)}}> {'<'} </PageNav>
            {pages.map((page, index) => {
                return <Pageitem className={activePage === page && 'active'} key={index} onClick={() => {pager(api, page)}}>{page}</Pageitem>
            })}
                <PageNav onClick={() => {pager(api, activePage+1)}}> {'>'} </PageNav>
            </PagesContainer>

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