import { useState, useEffect } from "react"
import styled from "styled-components"

export default function Switch({ name }) {
    
    const [status, setStatus] = useState(0)

    function activeSwitch(target) {
        
        target.classList.toggle('activeSwitch')
        status === 1 ? setStatus(0) : setStatus(1)


    }
    useEffect(() => {
        setStatus(0)
    }, [])
    
    return (
        <>
            <SwitchContainer onClick={(event) => { activeSwitch(event.target) }} />
            <input type="hidden" name={name} value={status} />
        </>
    )

}

const SwitchContainer = styled.div`
border-radius: 50px;
background-color: #E3E3E3;
position: relative;
width: 4rem;
height: 2rem;
cursor: pointer;

::before {
    content: "";
    border-radius: 100%;
    background-color: ${props => props.theme.featureColor};
    width: 2rem;
    height: 2rem;
    position: absolute;
    top: 0;
    right: 0;
    transition: all .5s;
}
&.activeSwitch::before {
    background-color: ${props => props.theme.featureColor2};
    transform: translateX(-100%);
}
`