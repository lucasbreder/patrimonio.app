import axios from "axios";
import { useRouter } from "next/router";
import styled from 'styled-components'
import { parseCookies } from 'nookies'

export default function Delete({ id, parent, slug }) {
    const path = useRouter();

    const apislug = slug ? slug : path.query.slug

    const deleteItem = async (itemId, parent) => {

        const cookies = parseCookies()
        const token = cookies.token

        const confirmRes = confirm(`Deseja mesmo excluir o item ${id}?`)

        if (confirmRes) {
            const remove = await axios.delete(`${process.env.NEXT_PUBLIC_API}${apislug}/${itemId}`, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            })
            if (remove.status === 200) {
                
                parent && parent.current.remove()

            } else {
                alert('Houve um erro ao excluir esse item')
            }


        }
      }

    return (
       <DeleteContainer onClick={(event) => {deleteItem(id, parent)}}> </DeleteContainer>
    )
    
}

const DeleteContainer = styled.div`
    border-radius: 100%;
    width: 35px;
    height: 35px;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('/icons/delete.svg');
    background-color: ${props => props.theme.featureColor2};
    cursor: pointer;
`