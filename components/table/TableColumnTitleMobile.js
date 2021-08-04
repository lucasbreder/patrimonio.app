import Link from "next/link";
import styled from 'styled-components'
import stringTranslate from "../../helpers/stringTranslate";

export default function TableColumnTitleMobile({ title }) {

    return (
        <TableColumnTitleMobileContainer>{stringTranslate(title)}</TableColumnTitleMobileContainer>
    )
}

const TableColumnTitleMobileContainer = styled.span`
    font-size: .8rem;
    display: none;
    margin-bottom: .5rem;

    @media (max-width: ${props => props.theme.mobileBreakPoint}) {
        display: block;
    }
`