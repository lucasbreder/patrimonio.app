import styled from "styled-components"
import { BackgroundImage } from "../styles/mixins"
import nookies from 'nookies'
import axios from "axios"
import { useRef } from "react"

export default function Filter({ api, setItensFiltered, filterOptions }) {

    const filterList = useRef()

    function showFilter() {
        filterList.current.classList.toggle("active")
    }
    
    async function filter(api, term, value) {
        const cookies = nookies.get()
        
        const res = await axios.get(api+'?'+term+'='+value, {
          headers: {
            'Authorization': `bearer ${cookies.token}`
          }
        })
        const resData = await res.data
        
        setItensFiltered(resData)
        
    }


    return (
        <FilterContainer>
            <FilterIcon onClick={() => {showFilter()}} />
            <FilterList ref={filterList}>
                {filterOptions.map((item, index) => {
                    return <FilterItem key={index} onClick={() => { filter(api, item.term, item.value); showFilter() }} >{item.title}</FilterItem>
                })}
                </FilterList>
        </FilterContainer>
    )
}

const FilterContainer = styled.div`
    display: flex;
    position: relative;
    div {
        margin-right: .5rem;
    }
`

const FilterIcon = styled.div`
    background-image: url('/icons/filter.svg');
    width: 30px;
    height: 30px;
    ${BackgroundImage}
`
const FilterList = styled.div`
    position: fixed;
    border-radius: 15px;
    background-color: ${props => props.theme.featureColor2};
    position: absolute;
    top: 40px;
    right: 0;
    z-index: 9;
    display: none;

    &.active {
        display: block;
    }
`

const FilterItem = styled.div`
    padding: 1rem;
    color: #fff;
`