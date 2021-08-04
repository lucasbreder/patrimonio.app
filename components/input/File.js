import { useRouter } from "next/router"
import { useEffect, useState, useRef } from "react"
import stringTranslate from "../../helpers/stringTranslate"
import styled from 'styled-components'
import findValidation from "../../helpers/findValidation"

export default function File({ params, data, validation }) {
    const path = useRouter()

    const imageInput = useRef(null)
    
    const [value, setValue] = useState()
    const [filepath, setFilepath] = useState(data ? `${process.env.NEXT_PUBLIC_NAME_STORAGEBASEURL}${path.query.slug}/${data}` : "")

    function changeHandler(target) {
        setValue(target.value)
        const [file] = target.files 
        if (file) {
            // image.current.src = URL.createObjectURL(file)
            setFilepath(URL.createObjectURL(file))
        }
    }

    function removeImage() {
        setValue()
        setFilepath()
        imageInput.current.value = ''
    }

    useEffect(() => {
        setValue(data)
    }, [])

    return (
        <>
        <p>{stringTranslate(params.name)}</p>
            <FileInputContainer>
               
            <FileLabel filepath={value ? "Alterar arquivo" : "Selecione um arquivo"}>
                <input ref={imageInput} type="file" name={params.name} required={params.required} onChange={(event) => { changeHandler(event.target) }} />
                </FileLabel>
                <ImgContainer src={filepath}>
                {value && <RemoveImage onClick={() => {removeImage()}} />}
                </ImgContainer>
                
            </FileInputContainer>
            <p>{findValidation(validation, params.name)}</p>
        </>
    )
}
const RemoveImage = styled.span`
    display: block;
    width: 25px;
    height: 25px;
    background-color: ${props => props.theme.featureColor};
    border-radius: 100%;
    text-align: center;
    cursor: pointer;
    background-image: url('/icons/close.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: auto 70%;
    position: relative;
    left: -10px;
    top: -10px;

    @media (max-width: ${props => props.theme.mobileBreakPoint}) {
      margin: 0 auto;
      left: 0;
    } 
`
const FileLabel = styled.label`
    background-color: ${props => props.theme.featureColor};
    position: relative;
    color: #fff;
    display: none;
    cursor: pointer;
    border-radius: 10px;
    font-weight: bold;
    text-align: center;
    padding: 1rem;

    ::after {
        content: '${props => props.filepath}';
    }

    input[type='file'] {
       opacity: 0;
        padding: 0;
        height: 1px;
    }
`

const ImgContainer = styled.span`
    display: block;
    width: 30%;
    height: 200px;
    margin-left: 2rem;
    background-image: url('${props => props.src}');
    background-position: left center;
    background-size: contain;
    background-repeat: no-repeat;

    @media (max-width: ${props => props.theme.mobileBreakPoint}) {
        margin-left: 0;
        width: 80%;
        background-position: center;
    } 

`

const FileInputContainer = styled.span`
    display: block;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 2rem 0;
    border-bottom: 1px solid #ccc;
    padding-bottom: 2rem;
    position: relative;

    @media (max-width: ${props => props.theme.mobileBreakPoint}) {
        flex-flow: column;
    } 
`