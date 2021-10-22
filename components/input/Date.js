import moment from "moment";
import { useEffect, useState } from "react"
import stringTranslate from "../../helpers/stringTranslate"
import Validation from "../Validation"

export default function DateInput({ params, data, validation }) {
    
    const [value, setValue] = useState(moment(data).format('yyyy-MM-DD'))


    useEffect(() => {
        setValue(moment(data).format('yyyy-MM-DD'))
    }, [])

    return (
        <label className={params.name}>
            <p>{stringTranslate(params.name)}</p>
            <input value={value} type="date" name={params.name} required={params.required} onChange={(event) => { setValue(event.target.value) }} />
            <Validation validation={validation} name={params.name} />
        </label>
    )

   
}
