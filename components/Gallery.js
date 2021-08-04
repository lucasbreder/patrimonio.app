import { useState } from "react"
import styled from "styled-components"
import { BackgroundImage } from "../styles/mixins"

export default function Gallery({ data, limit = 1 }) {

    const [images] = useState(Array.isArray(data) ? data : [data])
    
    return (
        <GalleryContainer>
            {
                images.map((item, index) => {
                    if(index + 1 <= limit) {
                        return <Image src={process.env.NEXT_PUBLIC_NAME_STORAGEBASEURL+item.path}/>
                    }
                })
            }
        </GalleryContainer>
    )   
    
}

const GalleryContainer = styled.div`
    display: flex;
    flex-flow: wrap;

`

const Image = styled.div`
    ${BackgroundImage}
    background-image: url(${props => props.src});
    background-size: cover;
    width: 150px;
    height: 150px;
    margin: .5rem;
`