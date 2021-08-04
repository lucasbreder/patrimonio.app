import Link from "next/link";
import styled from 'styled-components'
import stringTranslate from "../../helpers/stringTranslate";
import TableColumnTitleMobile from "./TableColumnTitleMobile";

export default function TableColumnString({ data, link, title }) {

    return (
        <Column>
            <TableColumnTitleMobile title={title}/>
            <Link href={link}> </Link>
            {data}
        </Column>
    )
}

const Column = styled.td`
    position: relative;

    a {
        width: 100%;
        height: 100%;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
    }
`