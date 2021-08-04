import axios from "axios"
import { useEffect, useState } from "react"
import fieldToSlug from "../../helpers/fieldToSlug"
import styled from 'styled-components'
import Loading from "../Loading"
import Link from "next/link"
import TableColumnTitleMobile from "./TableColumnTitleMobile"
import { parseCookies } from 'nookies'

export default function TableColumnForeignkey({ data, slug, title }) {
    const [query, setQuery] = useState()
    const [key, setKey] = useState()

    async function getData() {
        const cookies = parseCookies()
        const token = cookies.token
        const elements = await axios.get(`${process.env.NEXT_PUBLIC_API}${fieldToSlug(slug)}/${data}`, {
            headers: {
              'Authorization': `bearer ${token}`
            }
          })
        setQuery(elements.data)
        setKey(Object.keys(elements.data)[1])
    }
    
    useEffect(() => {
        getData()
    }, [])

    if (query && key) {
        return (
            <td>
                <TableColumnTitleMobile title={title}/>
                <TagContainer>
                    {[query].map((item, index) => {
                        return (
                            <Tag key={index}>
                                <Link href={`/edit/${fieldToSlug(slug)}/${item.id}`}>{item[key]}</Link>
                                
                            </Tag>
                        )
                    })}
                </TagContainer>
            </td>
        )
    } else {
        return <td><Loading/></td>
    }


}

const Tag = styled.span`
    display: inline-block;
    background-color: ${props => props.theme.featureColor2};
    text-align: center;
    padding: .5rem;
    color: #fff;
    font-size: .9rem;
    border-radius: 15px;
    font-weight: bold;
    word-break: keep-all;

    a {
        color: #fff;
    }

`

const TagContainer = styled.span`
    display: flex;
`