import { useState } from 'react'
import styled from 'styled-components'
import stringTranslate from '../../helpers/stringTranslate'

export default function TableHeader({ data, exclude, length, }) {

    const [headers] = useState(Object.keys(data[0])[0] !== "0" ? Object.keys(data[0]) : data)
    
    return (
        <TableHeaderContainer length={length}>
            <tr>
            {headers.map(
                (item, index) => {
                    if (!exclude.includes(item)) {
                        return <th key={index} className={item === 'pictures' ? 'pictures' : ''}>{stringTranslate(item)}</th>
                    }
                })}
            <th></th>
            </tr>
        </TableHeaderContainer>
    )
    
}

const TableHeaderContainer = styled.thead`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .pictures {
        order: -1;
    }

    tr {
        display: flex;
        flex-basis: 100%;
        justify-content: space-between;
        ${props => props.length > 10 ? "display:none;" : ""}

        @media (max-width: ${props => props.theme.mobileBreakPoint}) {
            flex-flow: column;
            display: none;
        }  

    }
    
    tr th{
        flex: 1 1 0;
        text-align: left;
        font-size: .9rem;
        text-transform: capitalize;
        font-weight: bold;
        color: ${props => props.theme.fadeColor};
    }


`