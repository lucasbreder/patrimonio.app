import Section from "./Section";
import Title from "./Title";
import nookies, { parseCookies } from 'nookies'
import { useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { BackgroundImage, ButtonStyle, Input, SubTitle, TextStyle } from "../styles/mixins";
import Switch from "./Switch";


export default function Check({ locals }) {

    const [sublocals, setSubLocals] = useState([])
    const [materials, setMaterials] = useState([])
    const [validation, setValidation] = useState([])
    const checks = useRef()
    const sublocalsRef = useRef()
    const localsRef = useRef()
    
    async function getSubLocals(id, target) {
        setSubLocals([])

        const localsItens = localsRef.current.querySelectorAll('div')

        localsItens.forEach((item) => {
            item.classList.remove('active')
        })

        const cookies = nookies.get()

        const res = await axios.get(`${process.env.NEXT_PUBLIC_API}local/${id}/sublocals`, {
            headers: {
              'Authorization': `bearer ${cookies.token}`
            }
        })
        const resSublocals = await res.data
        target.classList.add('active')
        setSubLocals(resSublocals)
        setMaterials([])
    }


    async function getMaterials(id, target) {

        setMaterials([])

        const sublocalsItens = sublocalsRef.current.querySelectorAll('div')

        sublocalsItens.forEach((item) => {
            item.classList.remove('active')
        })

        const cookies = nookies.get()
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API}sublocals/${id}/materials`, {
            headers: {
              'Authorization': `bearer ${cookies.token}`
            }
        })
        const resMaterials = await res.data
        target.classList.add('active')
        setMaterials(resMaterials)
    }

    async function saveCheck() {

        const cookies = parseCookies()
        const token = cookies.token

        if(checks) {
        const checkForms = checks.current.querySelectorAll('form')

            checkForms.forEach(async item => {

            const formData = new FormData(item)
            try {
                const query = await axios({
                    method: 'post',
                    url: process.env.NEXT_PUBLIC_API+'checks',
                    data: formData,
                    headers: {'Authorization': `bearer ${token}` }
                })
                item.classList.add('done')
                setStatus(query.status)
              } catch (ex) {
                if (ex.response && ex.response.status === 422) {
                    const errors = ex.response.data.errors;
                    setValidation(errors)
                  }
              }
        });

        }
    }


    return (
        <Section>
            <Title text="Checagem" />
            <ColumnsContainer>
            <Column ref={localsRef}>
            {
            locals.map((local) => {
                return <Item onClick={(event) => {getSubLocals(local.id, event.target)}}>{local.name}</Item>
            })
            }
            </Column>
            <Column ref={sublocalsRef}>
            {
            sublocals.map((sublocal) => {
                return <Item onClick={(event) => {getMaterials(sublocal.id, event.target)}}>{sublocal.name}</Item>
            })
            }
            </Column>
                <Column ref={checks}>
                   
                    {
                    materials.map((material) => {
                        return (
                            <CheckForm>
                            <MaterialContainer>
                                
                                <MaterialInputs>
                                    <MaterialTitle>
                                        <span>{material.baseMaterial.name}</span>
                                        <Switch name="checked" />
                                        </MaterialTitle>
                                        <p>Observações</p>
                                    <textarea name="description"></textarea>
                                    <input type="hidden" value={material.id} name="material_id" />
                                    
                                </MaterialInputs>
                                <MaterialOrientation>{material.baseMaterial.description}</MaterialOrientation>
                                </MaterialContainer>
                            </CheckForm>
                        )
                    })
                        }
                    {materials.length > 0 && <SaveCheck onClick={() => {saveCheck()}}>Salvar</SaveCheck>}
                    
                </Column>
            </ColumnsContainer>
        </Section>
    )
    
}
const ColumnsContainer = styled.div`
    display: flex;
    margin-top: 3rem;
`
const Column = styled.div`
    padding: 0 3rem;
    border-left: 1px solid #E3E3E3;
    display: flex;
    flex-direction: column;
    

    :first-of-type {
        border: none;
    }

    div.active {
        background-color: ${props => props.theme.featureColor2};
        position: relative;

        ::after {
            content: "";
            background-image: url('/icons/arrow.svg');
            width: 30px;
            height: 30px;
            position: absolute;
            top: calc(50% - 15px);
            right: -2.5rem;
            z-index: 3;
            ${BackgroundImage}
            
        }
    }
`

const Item = styled.div`
    ${ButtonStyle}
`

const CheckForm = styled.form`
    position: relative;

    &.done div {
        opacity: 0.4;
    }
    &.done::after {
        content: "Salvo com sucesso";
        display:block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2rem;
        text-align: center;
        width: 100%;
    }
    p {
        margin-bottom: .5rem;
    }
`
const MaterialContainer = styled.div`
    margin-bottom: 2rem;
    display: flex;
    justify-content: flex-start;
`
const MaterialTitle = styled.h2`
    margin-bottom: 1rem;
    flex-basis: 100%;
    display: flex;
    ${SubTitle}
    
    span {
        margin-right: 1rem;
    }
`
const MaterialInputs = styled.div`
    flex-basis: 20%;
    padding-right: 2rem;

    input, textarea, select {
        ${Input}
    }
`
const MaterialOrientation = styled.div`
    border-left: 1px solid #E3E3E3;
    padding-left: 2rem;
    flex-basis: 50%;
    min-height: 3rem;
    ${TextStyle}
`

const SaveCheck = styled.div`
    ${ButtonStyle}
    background-color: ${props => props.theme.featureColor2};
    margin: 1rem 0;
    width: 200px;
`