import axios from "axios";
import { useRouter } from "next/router";
import styled from 'styled-components'
import { parseCookies } from 'nookies'
import Link from "next/link";

export default function EditButton({ id }) {

    const path = useRouter();

    return (
        <EditContainer><Link href={`/edit/${path.query.slug}/${id}`}> </Link></EditContainer>
    )
    
}

const EditContainer = styled.div`
    border-radius: 100%;
    width: 35px;
    height: 35px;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('/icons/edit.svg');
    background-color: ${props => props.theme.featureColor};
    position: relative;
    a {
        position: absolute;
        width: 100%;
        height: 100%;
    }
`