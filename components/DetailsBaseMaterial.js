import { useRouter } from "next/router"
import { useState } from "react"
import styled from "styled-components"
import Section from "./Section"
import QRCode from 'qrcode.react'
import Gallery from "./Gallery"
import ListTools from "./ListTools"
import { ButtonStyle } from "../styles/mixins"
import Link from "next/link"

export default function DetailsBaseMaterial({ data }) {
    const [content] = useState(data)
    const path = useRouter();

    if (content) {
        return (
            <Section>
                <DetailsSection>
                <DetailsColumn>
                        <Title>
                            {content.name}
                        
                        </Title>
                        <Subtitle>{content.name_alternative}</Subtitle>
                        <TextBox>{content.description}</TextBox>
                        <Tools>
                            <ToolsItem><Link href="/create/materials/">Adicionar a minha unidade</Link></ToolsItem>
                            <ListTools id={content.id}/>
                        </Tools>
                    <DetailsBox>
                        <TitleSecondary>Orientações para conferência</TitleSecondary>
                            <TextBox>{content.description}</TextBox>
                            <QRCode value={process.env.NEXT_BASE_PATH+path.asPath} />
                    </DetailsBox>
                </DetailsColumn>
                <DetailsColumn>
                <DetailsBox>
                    <TitleSecondary>Características</TitleSecondary>
                    <TextBox>{content.features}</TextBox>
                    </DetailsBox>
                    <DetailsBox>
                    <TitleSecondary>Categorias</TitleSecondary>
                        <Categories>
                            {content.categories.map((item, index) => {
                                return <CategoryItem key={index}>{item.name}</CategoryItem>
                            })}    
                            </Categories>
                            <TitleSecondary>Imagens</TitleSecondary>
                            <Pictures>
                            
                                {content.pictures.map((item, index) => {
                                console.log(item)
                                return <Gallery key={index} data={item} limit="20"/>
                            })}    
                        </Pictures>
                </DetailsBox>
                    </DetailsColumn>
                    </DetailsSection>
            </Section>
        )
    } else {
        return 'Carregando'
    }
    
}

const DetailsSection = styled.div`
    display: flex;
`

const DetailsColumn = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 3rem;

    :first-of-type {
        border-right: 1px solid #4d4d4d;
        padding-left: 0;
    }
`

const Title = styled.h1`
    font-size: 3rem;
    font-weight: bold;
`
const Subtitle = styled.span`
    font-size: .9rem;
    margin-bottom: 1rem;
`
const Tools = styled.div`
    display: flex;
    margin: 1rem 0;

    a {
        color: #fff
    }
`

const ToolsItem = styled.div`
    background-color: ${props => props.theme.featureColor};
    border-radius: 40px;
    color: #fff;
    padding: .5rem;
    margin-right: 1rem;
    font-weight: bold;
`

const DetailsBox = styled.div`
        :nth-of-type(1) {
            h2 {
                color: ${props => props.theme.featureColor2};
            }
        
    }
`

const TitleSecondary = styled.h2`
    font-size: 1.5rem;
    color: ${props => props.theme.featureColor};
    margin: 1rem 0;
    font-weight: bold;

`

const TextBox = styled.div`
    line-height: 2rem;
    margin: 1rem 0;
`

const Categories = styled.div`
    display: flex;
    align-items: flex-start;
`

const CategoryItem = styled.div`
    ${ButtonStyle}
    margin: 1rem;
`

const Pictures = styled.div`
    display: flex;
    margin-top: 2rem;

    img {
        background-color: #ccc;
        background-image: url('/icons/image.svg');
        background-position: center;
        background-size: auto 40px;
        background-repeat: no-repeat;
        width: 150px;
        height: 150px;
        margin: 1rem;

        :first-of-type {
            border: 2px solid ${props => props.theme.featureColor};
        }
    }
`
