import styled from 'styled-components'
import { useRef } from 'react'
import Link from 'next/link'
import ListTools from './ListTools'
import { useRouter } from 'next/router'

export default function ListBoxItem({ data }) {

    const router = useRouter()

    const parentItem = useRef(null)

    

    return (
        <Item ref={parentItem}>
            <Link href={router.query.slug !== 'categories' ? `/list/materials/?${router.query.slug}=${data.id}` : `/edit/${router.query.slug}/${data.id}`}>{data.name}</Link>
            <Additionalnfo>{(router.query.slug === 'sublocals' && data.local) && data.local.name}</Additionalnfo>
            <ToolsBox>
                <ListTools id={data.id} parent={parentItem} />
            </ToolsBox>
        </Item>
    )
}
 
const Item = styled.div`
    border: 1px solid #4D4D4D;
    border-radius: 15px;
    padding: 3rem 2rem;
    margin: 1rem;
    text-align: center;
    flex-basis: calc(20% - 2rem);
    position: relative;

    @media (max-width: ${props => props.theme.mobileBreakPoint}) {
        flex-basis: 100%;
        margin: 1rem 0;
    }

    a {
        color: #18669E;
        font-weight: bold;
        font-style: italic;
    }
`

const ToolsBox = styled.div`
    position: absolute;
    bottom: -20px;
    right: 20px;
`

const Additionalnfo = styled.div`
    font-size: .9rem;
    margin-top: .5rem;
`