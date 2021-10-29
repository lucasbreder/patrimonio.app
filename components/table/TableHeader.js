import styled from 'styled-components'
import stringTranslate from '../../helpers/stringTranslate'

export default function TableHeader({ data, exclude, slug }) {

    const headers = 
        Object.keys(data[0])[0] !== "0"
            ?
            slug === 'materials' ? Object.keys(data[0]).sort() : Object.keys(data[0])
            :
            data
    
    return (
        <TableHeaderContainer>
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

    .pictures, .name {
        order: -1;
    }

    tr {
        display: flex;
        flex-basis: 100%;
        justify-content: space-between;

        @media (max-width: ${props => props.theme.mobileBreakPoint}) {
            flex-flow: column;
            display: none !important;
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

    tr th:nth-of-type(1) {
        flex-basis: 20%;
    }


`