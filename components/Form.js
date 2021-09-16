import axios from "axios"
import { useState } from "react"
import Button from "./Button"
import File from "./input/File"
import Select from "./input/Select"
import Text from "./input/Text"
import Foreignkey from "./input/Foreignkey"
import EditorInput from "./input/EditorInput"
import { useRouter } from "next/router"
import styled from 'styled-components'
import Textarea from "./input/Textarea"
import Notice from "./Notice"
import Checkbox from "./input/Checkbox"
import { parseCookies } from 'nookies'


export default function Form({ api, fields, data, type = "" }) {
    console.log(data)
    const [status, setStatus] = useState()
    const [validation, setValidation] = useState()
    const router = useRouter()


    
    const sendForm = async (event) => {
        event.preventDefault()

        const formData = new FormData(event.target)

        Object.keys(router.query).forEach(item => {
            if (item !== 'slug') {
                formData.append(item, router.query[item]);
            }
        });
        

        
        const cookies = parseCookies()
        const token = cookies.token
        const method = type === 'create' ? 'post' : 'put'

        try {
            const query = await axios({
                method: method,
                url: api,
                data: formData,
                headers: {'Authorization': `bearer ${token}` }
            })
            setStatus(query.status)
          } catch (ex) {
            if (ex.response && ex.response.status === 422) {
                const errors = ex.response.data.errors;
                console.log(errors)
                setValidation(errors)
              }
          }
         
    }
    if (status) {
        return (
            <>
            <Notice status={status} />
            <div onClick={() => router.back()}>
                <Button type="back" label="Voltar"/>        
            </div>
            </>
        )
    } else {
        return (
            <FormContainer>
            <form onSubmit={(event) => {sendForm(event)}} autoComplete="off">
                {
                    fields.map((item, index) => {

                        switch (item.type) {
                            case "select":
                                return (
                                    <Select validation={validation} key={index} params={item} data={data ? data[item.name] : ""}/>
                                )
                            case "file":
                                return (
                                    <File validation={validation} key={index} params={item} data={data ? data[item.name] : ""}/>
                                )
                            case "foreignkey":
                                return (
                                    <Foreignkey validation={validation} key={index} params={item} data={data ? data[item.name] : ""}/>
                                )
                            case "editor":
                                return (
                                    <EditorInput key={index} validation={validation} params={item} data={data ? data[item.name] : ""}/>
                                )
                            case "textarea":
                                return (
                                    <Textarea validation={validation} key={index} params={item} data={data ? data[item.name] : ""}/>
                                )
                            
                            case "boolean":
                                return (
                                    <Checkbox validation={validation} key={index} params={item} data={data ? data[item.name] : ""}/>
                                ) 
                        
                            default:
                               return <Text validation={validation} key={index} params={item} data={data ? data[item.name] : ""}/>
                        }
                        
                    })
                }
                <Button type="submit" label="Salvar"/>
                </form>
                
            </FormContainer>
        )
    }

    
}

const FormContainer = styled.div`
    form {
        display: flex;
        flex-wrap: wrap;
    }
    label {
        display: flex;
        flex-direction: column;
        margin: .5rem;
        flex-basis: 100%;

        @media (max-width: ${props => props.theme.mobileBreakPoint}) {
            flex-basis: calc(100% - 1rem) !important;
        } 
    }
    label.conservation, label.usability {
        flex-basis: calc(20% - 1rem);
    }
    label.status {
        flex-basis: calc(53% - 1rem);
    }
    label.base_material_id, label.local_id, label.sublocal_id {
        flex-basis: calc(33% - 1rem);
    }
    label.identification_number {
        flex-basis: calc(50% - 1rem);
    }
    label.management, label.subitem {
        flex-basis: calc(25% - 1rem);
    }
    p {
        margin-bottom: .5rem;
        text-transform: capitalize;
        font-size: .9rem;
        font-weight: bold;
    }
    input, select, textarea {
        border-radius: 10px;
        padding: 1rem;
        border: none;
        border-left: 0 solid ${props => props.theme.featureColor};;
        font-family: inherit;
        outline: none;
        transition: all .5s ease-in-out;

        @media (max-width: ${props => props.theme.mobileBreakPoint}) {
            font-size: 1rem;
        }
    }

    textarea {
        min-height: 100px;
    }

    img {
        max-width: 100%;
    }
`