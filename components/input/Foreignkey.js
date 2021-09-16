import axios from "axios"
import { useEffect, useState } from "react"
import stringTranslate from "../../helpers/stringTranslate"
import { parseCookies } from 'nookies'
import Validation from "../Validation"

export default function Foreignkey({ params, data, validation }) {

    const [value, setValue] = useState(data)
    const [query, setQuery] = useState()

    async function getData() {
        const cookies = parseCookies()
        const token = cookies.token
        const elements = await axios.get(`${process.env.NEXT_PUBLIC_API}${params.relation}`, {
            headers: {
              'Authorization': `bearer ${token}`
            }
          })
        setQuery(elements.data)
    }

    useEffect(() => {
        setValue(data)
        getData()

    }, [])

    if (query) {
        return (
            <label className={params.name}>
                <p>{stringTranslate(params.name)}</p>
                
                <select value={value} name={params.many ? params.name+'[]' : params.name} multiple={params.many ? true : false} onChange={(event) => { setValue(event.target.value) }}>
                    {!params.many && <option value=""></option>}
                    {query.map((item, index) => {
                        return <option key={index} value={item.id} >{Object.values(item)[1]}</option>
                    })}
                </select>
                <Validation validation={validation} name={params.name} />
            </label>
        )
    }  else {
        return "Carregando"
    }

    

   
}