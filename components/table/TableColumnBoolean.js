import Link from "next/link";
import styled from 'styled-components'
import stringTranslate from "../../helpers/stringTranslate";
import TableColumnTitleMobile from "./TableColumnTitleMobile";

export default function TableColumnBoolean({ data, title }) {


    if (data === 1) {
        return (
            <Column>
                <TableColumnTitleMobile title={title}/>
              <Enable/>
            </Column>
        )
    } else {
        return (
            <Column>
            <TableColumnTitleMobile title={title}/>
              <Disabled/>
            </Column>
        )
    }

    
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

const Enable = styled.span`
    display: block;
    width: 30px;
    height: 30px;
    background-color: #1b9a1b;
    background-image: url('/icons/check.svg');
    background-position: center;
    background-size: auto 80%;
    background-repeat: no-repeat;
    border-radius: 100%;
`

const Disabled = styled.span`
    display: block;
    width: 30px;
    height: 30px;
    background-color: #bb3030;
    background-image: url('/icons/close.svg');
    background-position: center;
    background-size: auto 80%;
    background-repeat: no-repeat;
    border-radius: 100%;
`