import styled from "styled-components"
import { BackgroundImage } from "../../styles/mixins"

export default function TableColumnGallery({ data, limit = 1 }) {
    if (data && Array.isArray(data)) {
        return (
            <ColumnGallery>
                {
                    data.map((item, index) => {
                        if(index + 1 <= limit) {
                            return <Image src={process.env.NEXT_PUBLIC_NAME_STORAGEBASEURL+item.path}/>
                        }
                    })
                }
            </ColumnGallery>
        )   
    } else {
        return (
            <td></td>
        )   
    }
   
}

const ColumnGallery = styled.td`
order: -1;
img {
    border-radius: 100%;
    width: 120px;
    height: 120px;
    background-color: ${props => props.theme.fadeColor};
}
`

const Image = styled.div`
    ${BackgroundImage}
    background-image: url(${props => props.src});
    background-size: cover;
    width: 150px;
    height: 150px;
    border-radius: 100%;
`