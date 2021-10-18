import axios from "axios"
import { useEffect, useState } from "react"
import stringTranslate from "../../helpers/stringTranslate"
import { parseCookies } from 'nookies'
import Validation from "../Validation"

export default function Foreignkey({ params, data, validation }) {

    const [value, setValue] = useState(data)
    const [valueMany, setValueMany] = useState([])
    const [query, setQuery] = useState()

    async function getData() {
        const cookies = parseCookies()
        const token = cookies.token
        const elements = await axios.get(`${process.env.NEXT_PUBLIC_API}${params.relation}/?perPage=all`, {
            headers: {
              'Authorization': `bearer ${token}`
            }
          })
        setQuery(elements.data.data ? elements.data.data : elements.data)
    }

    useEffect(() => {
        setValue(data)
        getData()
        if (params.many) {
            data.forEach(element => {
                valueMany.push(element.id)
            });
        }
    }, [])

    if (query) {
        return (
            <label className={params.name}>
                <p>{stringTranslate(params.name)}</p>

                {params.many ?
                    <select name={params.many ? params.name+'[]' : params.name} multiple={params.many ? true : false} onChange={(event) => { setValue(event.target.value) }}>
                    {!params.many && <option value=""></option>}
                    {query.map((item, index) => {
                        return <option key={index} value={item.id} selected={valueMany.includes(item.id)} >{Object.values(item)[1]}</option>
                    })}
                    </select>
                    :
                    <select value={params.many ? '' : value} name={params.many ? params.name+'[]' : params.name} multiple={params.many ? true : false} onChange={(event) => { setValue(event.target.value) }}>
                    {!params.many && <option value=""></option>}
                    {query.map((item, index) => {
                        return <option key={index} value={item.id} >{Object.values(item)[1]}</option>
                    })}
                </select>
            }
                
                
                <Validation validation={validation} name={params.name} />
            </label>
        )
    }  else {
        return "Carregando"
    }

    

   
}