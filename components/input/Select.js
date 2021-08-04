import { useEffect, useState } from "react"
import findValidation from "../../helpers/findValidation"
import stringTranslate from "../../helpers/stringTranslate"

export default function Select({ params, data, validation }) {
    
    const [value, setValue] = useState(data)

    useEffect(() => {
        setValue(data)
    }, [])

    return (
        <label>
            <p>{stringTranslate(params.name)}</p>
            <select value={value} name={params.name} required={params.required} onChange={(event) => { setValue(event.target.value) }}>
                <option value=""></option>
                {
                    params.options.map((item, index) => {
                        return <option key={index} value={item}>{item}</option>
                    })
                }
            </select>
            <p>{findValidation(validation, params.name)}</p>
        </label>
    )

   
}