import { useEffect, useState } from "react"
import stringTranslate from "../../helpers/stringTranslate"
import Validation from "../Validation"

export default function Range({ params, data, validation }) {
    
    const [value, setValue] = useState(data)

    useEffect(() => {
        setValue(data)
    }, [])

    return (
        <label className={params.name}>
            <p>{stringTranslate(params.name)}</p>
            <input value={value ? value : ""} type="range" min={params.start} max={params.stop} name={params.name} required={params.required} onChange={(event) => { setValue(event.target.value) }} />
            <Validation validation={validation} name={params.name} />
        </label>
    )

   
}
