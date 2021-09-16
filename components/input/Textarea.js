import { useEffect, useState } from "react"
import stringTranslate from "../../helpers/stringTranslate"
import Validation from "../Validation"

export default function Textarea({ params, data, validation }) {
    
    const [value, setValue] = useState(data)

    useEffect(() => {
        setValue(data)
    }, [])

    return (
        <label>
            <p>{stringTranslate(params.name)}</p>
            <textarea value={value ? value : ""} name={params.name} required={params.required} onChange={(event) => { setValue(event.target.value) }} />
            <Validation validation={validation} name={params.name} />
        </label>
    )

   
}