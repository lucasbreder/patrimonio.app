import { useEffect, useState } from "react"
import findValidation from "../../helpers/findValidation"
import stringTranslate from "../../helpers/stringTranslate"

export default function Textarea({ params, data, validation }) {
    
    const [value, setValue] = useState(data)

    useEffect(() => {
        setValue(data)
    }, [])

    return (
        <label>
            <p>{stringTranslate(params.name)}</p>
            <textarea value={value ? value : ""} name={params.name} required={params.required} onChange={(event) => { setValue(event.target.value) }} />
            <p>{findValidation(validation, params.name)}</p>
        </label>
    )

   
}