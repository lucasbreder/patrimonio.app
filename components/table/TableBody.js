import varType from "../../helpers/varType"
import TableColumnObject from "./TableColumnObject"
import TableColumnString from "./TableColumnString"
import TableColumnDate from "./TableColumnDate"
import TableColumnFile from "./TableColumnFile"
import { useRouter } from "next/router"
import styled from 'styled-components'
import TableColumnForeignkey from "./TableColumnForeignkey"
import TableColumnBoolean from "./TableColumnBoolean"
import TableColumnGallery from "./TableColumnGallery"
import ListTools from "../ListTools"

export default function TableBody({ data, slug, exclude, length }) {
    const path = useRouter();

    return (
        <TableBodyContainer length={length}>
            {data.map((item, index) => {

            return (
                <tr key={index}>
                     
                {Object.keys(item).map(
                    (item, innerIndex) => {
                        if (!exclude.includes(item)) {
                        if (process.env.NEXT_PUBLIC_FOREIGNKEYLIST.includes(item)) {
                            return <TableColumnForeignkey title={item} slug={item} key={innerIndex} data={data[index][item]} />
                        } else if (varType(data[index][item]) === 'object') {
                            if (item === 'pictures') {
                                return <TableColumnGallery data={data[index][item]} />
                            } else {
                                return <TableColumnObject title={item} slug={item} key={innerIndex} data={data[index][item]} />
                            }
                            
                        } else if (varType(data[index][item]) === 'date') {
                            return <TableColumnDate title={item} key={innerIndex} data={data[index][item]} />
                        } else if (varType(data[index][item]) === 'file') {
                            return <TableColumnFile title={item} key={innerIndex} slug={slug} data={data[index][item]} />
                        } else if (process.env.NEXT_PUBLIC_BOOLEANLIST.includes(item)) {
                            return <TableColumnBoolean title={item} key={innerIndex} slug={slug} data={data[index][item]} />
                        } else {
                            return <TableColumnString title={item} link={`/details/${path.query.slug}/${data[index].id}`} key={innerIndex} data={data[index][item]} />
                        }
                    }
                    })}
                    <td><ListTools id={item.id}/></td>
                </tr>
            )
            
        })}
        </TableBodyContainer>
    )
    
}

const TableBodyContainer = styled.tbody`
        box-shadow: 0 0 1px rgba(0,0,0,.2);
        border-radius: 10px 10px 0 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

    tr {
        display: flex;
        ${props => props.length > 10 ? "flex-flow: column;" : ""}
        border-bottom: ${props => props.theme.fadeColor} 1px solid;

        @media (max-width: ${props => props.theme.mobileBreakPoint}) {
            flex-flow: column;
            border-bottom: 2px solid #ccc;
        } 
    }
    
    tr:first-of-type td:first-of-type {
        border-radius: 10px 0 0 0;
    }
    tr:first-of-type td:last-of-type {
        border-radius: 0 10px 0 0;
    }
    tr:last-of-type {
        border-bottom: 3px solid ${props => props.theme.featureColor};
    }
    tr td:nth-of-type(1) {
        color: ${props => props.theme.featureColor};
        font-weight: 900;
        font-style: italic;
        font-size: 1.3rem;

        @media (max-width: ${props => props.theme.mobileBreakPoint}) {
            font-size: 2rem;
        }
    }
    tr td {
        background-color: ${props => props.theme.tableBackgroundColor};
        transition: all .3s;
        ${props => props.length > 10 ? "padding: 1rem 2rem;" : ""}
        flex: ${props => props.length > 10 ? "auto" : "1 1 0 "};
    }
    tr:hover td {
        background-color: ${props => props.theme.backgroundColor};
    }
    span {
        display: ${props => props.length > 10 ? "block" : "auto"};
    }
`