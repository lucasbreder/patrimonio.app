import { useEffect, useState } from "react"
import stringTranslate from "../../helpers/stringTranslate"
import Validation from "../Validation"

export default function Checkbox({ params, data, validation }) {
    
    const [value, setValue] = useState(data)

    function handleCheckboxValue() {
        value === 1 ? setValue(0) : setValue(1)
    }

    useEffect(() => {
        setValue(data)
    }, [])

    return (
        <label>
            <p>{stringTranslate(params.name)}</p>
            <input type="checkbox" onChange={() => { handleCheckboxValue() }} checked={value} />
            <input type="hidden" name={params.name} value={value} />
            <Validation validation={validation} name={params.name} />
        </label>
    )

   
}