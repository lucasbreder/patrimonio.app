import Link from "next/link"
import { useState, useEffect } from "react"
import styled from 'styled-components'
import fieldToSlug from "../../helpers/fieldToSlug"
import TableColumnTitleMobile from "./TableColumnTitleMobile"

export default function TableColumnObject({ data, slug, title }) {

    const [key, setKey] = useState()

    useEffect(() => {
        if (data && data.length > 0) {
            setKey(Object.keys(data[0])[1])
        } else[
            setKey()
        ]
    }, [])

    return (
        <td>
            <TableColumnTitleMobile title={title}/>
            <TagContainer>
                {data && Object.entries(data).map((item, index) => {
                    const title = item[1][key]
                    return (
                        <Tag key={index}>
                            <Link href={`/edit/${fieldToSlug(slug)}/${item[1].id}`}><a> {title} </a></Link>
                        </Tag>
                    )
                })}
            </TagContainer>
        </td>
    )
}


const Tag = styled.span`
    display: inline-block;
    background-color: ${props => props.theme.featureColor2};
    text-align: center;
    padding: .5rem;
    color: #fff;
    font-size: .9rem;
    border-radius: 40px;
    margin: .2rem;
    vertical-align: middle;
    font-weight: bold;
    word-break: keep-all;

    a {
        color: #fff;
    }

`

const TagContainer = styled.span`
    display: flex;
    align-items: center;
    flex-flow: wrap;
`