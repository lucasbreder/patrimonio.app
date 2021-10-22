import { useState } from "react"
import Moment from "react-moment"
import styled from "styled-components"
import { useRouter } from "next/router"
import Range from "./Range"
import Section from "./Section"
import QRCode from 'qrcode.react'
import ListTools from "./ListTools"
import Button from "./Button"
import { ButtonStyle } from "../styles/mixins"

export default function DetailsMaterial({ data }) {
    const [content] = useState(data)
    const path = useRouter()

    if (content) {
        return (
            <Section>
                <DetailsSection>
                    <DetailsColumn>
                        
                        <Title>{content.baseMaterial.name}<span>{content.identification_number}</span></Title>
                        <Subtitle>{content.baseMaterial.name_alternative}</Subtitle>
                        <ListTools id={content.id}/>
                        <TextBox>{content.baseMaterial.description}</TextBox>
                        <TitleBox>Orientaçao para checagem</TitleBox>
                        <TextBox>{content.baseMaterial.check_default}</TextBox>
                    <DetailsBox>
                            <RangeBox>
                                <span>Conversação</span>
                                <Range number={content.conservation} />
                            </RangeBox>
                            <RangeBox>
                                <span>Usabilidade</span>
                                <Range number={content.usability} />
                            </RangeBox>
                        </DetailsBox>
                        <DetailsBox>
                        
                            <TitleSecondary>Informações Adicionais</TitleSecondary>
                            <TitleBox>Quantidade no Local</TitleBox>
                            <TextBox>{content.quantity}</TextBox>
                            <TitleBox>Número de Série</TitleBox>
                            <TextBox>{content.serial_number}</TextBox>
                            <TitleBox>Gestão</TitleBox>
                            <TextBox>{content.management}</TextBox>
                            <TitleBox>Subitem</TitleBox>
                            <TextBox>{content.subitem}</TextBox>
                            <TitleBox>Preço</TitleBox>
                            <TextBox>{content.price}</TextBox>
                            <QRCode value={process.env.NEXT_BASE_PATH+path.asPath} />
                    </DetailsBox>
                    <DetailsBox>
                </DetailsBox>
                    </DetailsColumn>
                    <DetailsColumn>
                        <DetailsBox>
                            <TitleBox>Status</TitleBox>
                            <StatusBox>{content.status}</StatusBox>
                            <TitleBox>Local</TitleBox>
                            <LocalBox>{content.local.name}</LocalBox>
                            <SubLocalBox>{content.sublocal.name}</SubLocalBox>
                        </DetailsBox>
                    </DetailsColumn>
                <DetailsColumn>
                    <DetailsBox>
                            <TitleSecondary>Histórico</TitleSecondary>
                            <Button type='new' link={`/create/histories?material_id=${content.id}`} label='Adicionar' />
                        <History>
                                {content.histories.map((item, index) => {
                                return (
                                    <HistoryItem key={index}>
                                        <HistoryItemDate>
                                            <Moment format="DD/MM/YYYY" >{item.created_at}</Moment>
                                        </HistoryItemDate>
                                        <HistoryAuthor>{item.user.registry}</HistoryAuthor>
                                        <HistoryItemDescription>
                                            { item.description }
                                        </HistoryItemDescription>
                                        <ListTools id={item.id} slug="histories"/>
                                    </HistoryItem>
                                )
                            })}    
                            </History>
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
    flex-basis: 50%;

    :first-of-type {
        border-right: 1px solid #4d4d4d;
        padding-left: 0;
    }
    :nth-of-type(2) {
        flex-basis: 10%;
        border-right: 1px solid #4d4d4d;
        text-align: center;
        align-items: center;
        justify-content: center;
    }
`

const Title = styled.h1`
    font-size: 3rem;
    font-weight: bold;

    span {
        font-size: .8rem;
        font-weight: normal;
        margin-left: .5rem;
    }
`
const Subtitle = styled.span`
    font-size: .9rem;
    margin-bottom: 1rem;
`
const Tools = styled.div`
    display: flex;
    margin: 1rem 0;
`

const ToolsItem = styled.div`
    background-color: ${props => props.theme.featureColor};
    border-radius: 40px;
    color: #fff;
    padding: 1rem;
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

const TitleBox = styled.h3`
    font-weight: bold;
`

const TextBox = styled.div`
    line-height: 2rem;
    margin: 1rem 0;
`

const History = styled.div`
    display: flex;
    flex-direction: column;
    
`

const HistoryItem = styled.div`
    margin: 1rem 0;
    position: relative;
`

const HistoryAuthor = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    font-size: .8rem;
`

const RangeBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    justify-content: flex-start;

    span {
        margin-right: 1rem;
        font-weight: bold;
        flex-basis: 15%;
    }
`
const HistoryItemDate = styled.div`

   font-weight: bold;
   margin-bottom: .5rem;
   font-size: .8rem;

   time {
    color: ${props => props.theme.featureColor};
   }
`
const HistoryItemDescription = styled.div`
    line-height: 2rem;
    margin-bottom: 1rem;
`

const StatusBox = styled.div`
    ${ButtonStyle}
    margin-bottom: 3rem;
`
const LocalBox = styled.div`
    ${ButtonStyle}
    background-color: ${props => props.theme.featureColor2};
`
const SubLocalBox = styled.div`
    ${ButtonStyle}
    background-color: ${props => props.theme.featureColor2};
    position: relative;
    margin-top: 2.2rem;
    ::before {
        content: '';
        display: block;
        position: absolute;
        left: 50%;
        top: -25px;
        transform: translateX(-50%);

        width: 0; 
        height: 0; 
        border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  
  border-top: 15px solid #707070;
    }
`