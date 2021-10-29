import Link from "next/link"
import styled from 'styled-components'
import TableColumnTitleMobile from "./TableColumnTitleMobile"

export default function TableColumnObject({ data, title, link }) {

    return (
        <td>
            <TableColumnTitleMobile title={title}/>
            {data &&
                
                <TagContainer>
                {
                    Array.isArray(data)
                        
                    ?
                        data.map((item, index) => {

                             return <Tag><Link key={index} href={link}><a> {item.name} </a></Link></Tag>
                        })
                    :
                    <Tag><Link href={link}><a> {data.name} </a></Link></Tag>

                }

                </TagContainer>
            }
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