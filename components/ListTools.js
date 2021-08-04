import styled from "styled-components";
import Delete from "./Delete";
import EditButton from "./EditButton";

export default function ListTools({id}) {
    return (
        <ToolsContainer>
            <EditButton id={id}/>
            <Delete id={id} />
        </ToolsContainer>
    )
}

const ToolsContainer = styled.div`
    display: flex;
    div {
        margin-right: .5rem;
    }
`