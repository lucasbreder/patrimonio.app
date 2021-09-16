import styled from "styled-components"
import { BackgroundImage, Input, ButtonStyle } from "../styles/mixins"
import nookies from 'nookies'
import axios from "axios"
import { useState } from "react/cjs/react.development"
import { useRef } from "react"
import Button from "./Button"

export default function DateFilter({ api, setItensFiltered, filterOptions }) {

    const [devolutionStart, setDevolutionStart] = useState('')
    const [devolutionEnd, setDevolutionEnd] = useState('')
    const [createStart, setCreateStart] = useState('')
    const [createEnd, setCreateEnd] = useState('')
    const filterList = useRef()

    function showFilter() {
        filterList.current.classList.toggle("active")
    }
    
    async function dateFilter(api) {
        const cookies = nookies.get()
        let request = ""

        if (devolutionStart && devolutionEnd) {
            request = `?devolutionStart=${devolutionStart}&devolutionEnd=${devolutionEnd}`
        }

        if (createStart && createEnd) {
            request = `?createStart=${createStart}&createEnd=${createEnd}`
        }

        const res = await axios.get(api+request, {
          headers: {
            'Authorization': `bearer ${cookies.token}`
          }
        })

        console.log(request)
        const resData = await res.data
        setItensFiltered(resData)
        
    }

    function setDateFilter(variation, target) {

        if (variation === 'devolutionStart') {
            setDevolutionStart(target.value)
            setCreateStart('')
            setCreateEnd('')
        }

        if (variation === 'devolutionEnd') {
            setDevolutionEnd(target.value)
            setCreateStart('')
            setCreateEnd('')
        }

        if (variation === 'createStart') {
            setCreateStart(target.value)
            setDevolutionStart('')
            setDevolutionEnd('')
        }

        if (variation === 'createEnd') {
            setCreateEnd(target.value)
            setDevolutionStart('')
            setDevolutionEnd('')
        }
    }

    function dateValue(variation) {

        if (variation === 'devolutionStart') {
            return devolutionStart
        }

        if (variation === 'devolutionEnd') {
            return devolutionEnd
        }

        if (variation === 'createStart') {
            return createStart
        }

        if (variation === 'createEnd') {
            return createEnd
        }

    }

    return (
        <FilterContainer>
            <FilterList ref={filterList}>
                {filterOptions.map((item, index) => {
                    return (
                        <FilterItem key={index}>
                            <label>{item.title}</label>
                            <input
                                type="date"
                                name={item.term}
                                value={dateValue(item.term)}
                                onChange={(event) => { setDateFilter(item.term, event.target) }} />
                        </FilterItem>
                    )
                })}
                <FilterButton onClick={() => {dateFilter(api)}}>OK</FilterButton>
                </FilterList>
                <FilterIcon onClick={() => {showFilter()}} />
        </FilterContainer>
    )
}

const FilterContainer = styled.div`
    display: flex;
    div {
        margin-right: .5rem;
    }
    @media (max-width: ${props => props.theme.mobileBreakPoint}) {
        flex-wrap: wrap;
        justify-content: flex-end;
    }
` 

const FilterIcon = styled.div`
    background-image: url('/icons/calendar.svg');
    width: 30px;
    height: 30px;
    ${BackgroundImage}
`
const FilterList = styled.div`
    display: none;
    flex-basis: 100%;
    flex-flow: wrap;
    border: 1px solid #ccc;
    border-radius: 15px;
    padding: .5rem;

    &.active {
        display: flex;
    }
`

const FilterItem = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-basis: 40%;
    margin: .2rem;

    &:nth-of-type(2), &:nth-of-type(4) {
        justify-content: flex-start;
    }

    label {
        margin-right: .5rem;
        text-align: right;
    }
    input {
        ${Input}
    }
`

const FilterButton = styled.div`
    ${ButtonStyle}
`