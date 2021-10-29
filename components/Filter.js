import styled from "styled-components"
import { BackgroundImage } from "../styles/mixins"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { parseCookies } from "nookies"

export default function Filter() {

    const [filters, setFilters] = useState([])

    const router = useRouter()

    const filterList = useRef()

    function showFilter() {
        filterList.current.classList.toggle("active")
    }
    
    async function filter(term, value) {
        if (value === "all") {
            delete router.query[term]
        } else {  
            router.query[term] = value
            delete router.query.page
            router.push(router)
        }

    }
    

    const getFilters = async () => {
        const cookies = parseCookies()
        const filterQuery = await axios.get(`${process.env.NEXT_PUBLIC_API}filter/${router.query.slug}`, {
        headers: {
            'Authorization': `bearer ${cookies.token}`
        }
        })

        if (filterQuery.data) {
            setFilters(filterQuery.data ? filterQuery.data : [])
        }
    }

    useEffect(() => {
        getFilters()

    },[filters])


    return (
        <FilterContainer>
            { filters.length > 0 && 
            <>            
            <FilterIcon onClick={() => {showFilter()}} />
             <FilterList ref={filterList}>
                {filters.map((item, index) => {
                    return <FilterItem key={index} onClick={() => { filter(item.term, item.value); showFilter() }} >{item.title}</FilterItem>
                })}
                </FilterList>
                </>
            }
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
    box-shadow: 3px 3px 10px rgba(0,0,0,0.2);
    opacity: 0;

    &.active {
        display: block;
        opacity: 1;
    }
`

const FilterItem = styled.div`
    padding: .5rem 1rem;
    color: #fff;
    cursor: pointer;
    transition: all 1s;

    :first-of-type {
        padding-top: 1rem;
    }
    :last-of-type {
        padding-bottom: 1rem;
    }
    :hover {
        opacity: .3;
    }
`