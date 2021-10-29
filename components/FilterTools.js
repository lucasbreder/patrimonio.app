import { useEffect } from "react";
import styled from "styled-components";
import DateFilter from "./DateFilter";
import Filter from "./Filter";
import Search from "./Search";

export default function FilterTools({filter, dateFilter }) {

    return (
        <ToolsContainer>
            {/* {dateFilter && <DateFilter />} */}
            <Search />
            <Filter />
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
        cursor: pointer;
    }
`