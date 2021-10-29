import axios from "axios"
import { useEffect, useState } from "react"
import stringTranslate from "../../helpers/stringTranslate"
import { parseCookies } from 'nookies'
import Validation from "../Validation"

export default function LocalInput({ params, data, validation }) {

    const [value, setValue] = useState(data['local_id'])
    const [valueRelation, setValueRelation] = useState(data['sublocal_id'])
    const [query, setQuery] = useState()
    const [queryRelation, setQueryRelation] = useState([])

    async function getData(relation, id) {

        const api = relation === params.relation ? relation : `local/${id}/sublocals`
        
        const cookies = parseCookies()
        const token = cookies.token
        const elements = await axios.get(`${process.env.NEXT_PUBLIC_API}${api}/?perPage=all`, {
            headers: {
              'Authorization': `bearer ${token}`
            }
          })
            relation === params.relation
            ?
            setQuery(elements.data.data ? elements.data.data : elements.data)
            :
            setQueryRelation(elements.data.data ? elements.data.data : elements.data)
    }

    useEffect(() => {
        getData('locals')
        value && getData('sublocals', value)
    }, [])

    if (query) {
        return (
            <>
            <label className={params.name}>
                <p>Local</p>
                    <select value={value} name="local_id" onChange={(event) => { setValue(event.target.value); getData('sublocals', event.target.value) }}>
                    <option value=""></option>
                    {query.map((item, index) => {
                        return <option key={index} value={item.id} >{Object.values(item)[1]}</option>
                    })}
                    </select>
                <Validation validation={validation} name={params.name} />
            </label>
            <label className={params.name}>
            <p>Sublocal</p>
                    <select name='sublocal_id' value={valueRelation} onChange={(event) => { setValueRelation(event.target.value) }}>
                    <option value=""></option>
                    {queryRelation.map((item, index) => {
                        return <option key={index} value={item.id}>{Object.values(item)[1]}</option>
                    })}
            </select>
            <Validation validation={validation} name={params.name} />
        </label>
            </>
        )
    }  else {
        return (
            <>
            <label className={params.name}>
                <p>Local</p>
                <input type="text" placeholder="Carregando..." disabled/>
                <Validation validation={validation} name={params.name} />
            </label>
            <label className={params.name}>
            <p>Sublocal</p>
                <input type="text" placeholder="Carregando..." disabled/>
                <Validation validation={validation} name={params.name} />
            </label>
            </>
            
        )
    }

    

   
}