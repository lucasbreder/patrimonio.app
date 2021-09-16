import { useEffect } from "react";
import styled from "styled-components";
import DateFilter from "./DateFilter";
import Filter from "./Filter";
import Search from "./Search";

export default function FilterTools({ setItensFiltered, api, filterSet, dateFilterSet }) {

    return (
        <ToolsContainer>
            {dateFilterSet && <DateFilter setItensFiltered={setItensFiltered} api={api} filterOptions={dateFilterSet} />}
            <Search setItensFiltered={setItensFiltered} api={api}/>
            {filterSet && <Filter setItensFiltered={setItensFiltered} api={api} filterOptions={filterSet} />}
        </ToolsContainer>
    )
}

const ToolsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    @media (max-width: ${props => props.theme.mobileBreakPoint}) {
        flex-flow: wrap;
    }
    
    div {
        margin-right: .5rem;
    }
`