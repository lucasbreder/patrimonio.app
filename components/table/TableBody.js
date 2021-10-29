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
import { useRef } from "react"
import TableHeader from "./TableHeader"

export default function TableBody({ data, slug, exclude }) {
    const path = useRouter();
    const parentItem = useRef(null)

    return (
        <>
        <TableBodyContainer>
            {data.map((item, index) => {
            const keys = slug === 'materials' ? Object.keys(item).sort() : Object.keys(item)
            return (
                <tr key={index} ref={parentItem}> 
                {keys.map(
                    (item, innerIndex) => {
                    if (!exclude.includes(item)) {
                        if (varType(data[index][item]) === 'object') {
                            if (item === 'pictures') {
                                return <TableColumnGallery data={data[index][item]} key={innerIndex}/>
                            } else {
                                return <TableColumnObject title={item} key={innerIndex} link={slug === 'users' ? `/edit/${path.query.slug}/${data[index].id}` :`/details/${path.query.slug}/${data[index].id}`}  data={data[index][item]} />
                            }
                            
                        } else if (varType(data[index][item]) === 'date') {
                            return <TableColumnDate title={item} key={innerIndex} data={data[index][item]} />
                        } else if (varType(data[index][item]) === 'file') {
                            return <TableColumnFile title={item} key={innerIndex} slug={slug} data={data[index][item]} />
                        } else if (process.env.NEXT_PUBLIC_BOOLEANLIST.includes(item)) {
                            return <TableColumnBoolean title={item} key={innerIndex} slug={slug} data={data[index][item]} />
                        } else {
                            return <TableColumnString title={item} link={slug === 'users' ? `/edit/${path.query.slug}/${data[index].id}` :`/details/${path.query.slug}/${data[index].id}`} key={innerIndex} data={data[index][item]} />
                        }
                    }
                    })}
                    <td>{parentItem && <ListTools id={item.id} parent={parentItem} />}</td>
                </tr>
            )
            
        })}
            </TableBodyContainer>
            </>
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
        flex-basis: 20%;

        @media (max-width: ${props => props.theme.mobileBreakPoint}) {
            font-size: 2rem;
        }
    }
    tr td {
        background-color: ${props => props.theme.tableBackgroundColor};
        transition: all .3s;
        flex: 1 1 0;
    }
    tr:hover td {
        background-color: ${props => props.theme.backgroundColor};
    }
    span {
        display: auto;
    }
`