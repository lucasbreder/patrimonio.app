import styled from "styled-components"
import { BackgroundImage } from "../../styles/mixins"

export default function TableColumnFile({ data }) {
    if (data) {
        return (
            <td>
                <Image src={process.env.NEXT_PUBLIC_NAME_STORAGEBASEURL+data}/>
            </td>
        )   
    } else {
        return (
            <td></td>
        )   
    }
   
}

const Image = styled.div`
    ${BackgroundImage}
    background-image: url(${props => props.src});
    background-size: cover;
    width: 150px;
    height: 150px;
`