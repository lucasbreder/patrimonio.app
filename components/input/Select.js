import { useEffect, useState } from "react"
import stringTranslate from "../../helpers/stringTranslate"
import Validation from "../Validation"

export default function Select({ params, data, validation }) {
    
    const [value, setValue] = useState(data)

    useEffect(() => {
        setValue(data)
    }, [])

    return (
        <label className={params.name}>
            <p>{stringTranslate(params.name)}</p>
            <select value={value} name={params.name} required={params.required} onChange={(event) => { setValue(event.target.value) }}>
                <option value=""></option>
                {
                    params.options.map((item, index) => {
                        return <option key={index} value={item}>{item}</option>
                    })
                }
            </select>
            <Validation validation={validation} name={params.name} />
        </label>
    )

   
}