import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { BackgroundImage, Input } from "../styles/mixins"
import nookies from 'nookies'
import axios from "axios"
import { useRouter } from "next/router"

export default function Search({ setItensFiltered, api, slug}) {
    
    const router = useRouter()
    const searchInput = useRef()

    const [searchTerm, setSearchTerm] = useState()

    function showSearch() {
        searchInput.current && searchInput.current.classList.toggle('active')
    }

    async function search(term) {
        router.query.s = term
        delete router.query.page
        router.push(router) 
    }

    useEffect(() => {
        setSearchTerm(router.query.s ? router.query.s : "")
    }, [router])

    return (
        <SearchContainer>
            <SearchIcon onClick={() => {showSearch()}} />
            <input value={searchTerm}
                onBlur={(event) => { search(event.target.value) }}
                onKeyDown={(event) => { event.key === "Enter" && search(event.target.value) }}
                onChange={(event) => { setSearchTerm(event.target.value) }} ref={searchInput} type="text" name="s" />
        </SearchContainer>
    )
}

const SearchContainer = styled.div`
    display: flex;
    div {
        margin-right: .5rem;
    }
    input {
        ${Input}
        width: 0;
        padding: 0;
    }
    input.active {
        width: 200px;
        padding: .5rem;
    }
`

const SearchIcon = styled.div`
    background-image: url('/icons/search.svg');
    width: 30px;
    height: 30px;
    ${BackgroundImage}
    
`