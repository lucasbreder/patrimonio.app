import { useRef } from "react"
import styled from "styled-components"
import { BackgroundImage, Input } from "../styles/mixins"
import nookies from 'nookies'
import axios from "axios"

export default function Search({ setItensFiltered, api }) {
    
    const searchInput = useRef()

    function showSearch() {
        searchInput.current && searchInput.current.classList.toggle('active')
    }

    async function search(api, term) {
        const cookies = nookies.get()

        const res = await axios.get(api+'?s='+term, {
          headers: {
            'Authorization': `bearer ${cookies.token}`
          }
        })
        const resData = await res.data.data
        searchInput.current && searchInput.current.classList.toggle('active')
        setItensFiltered(resData)
        
    }

    return (
        <SearchContainer>
            <SearchIcon onClick={() => {showSearch()}} />
            <input onBlur={(event) => {search(api, event.target.value)}} ref={searchInput} type="text" name="s"/>
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