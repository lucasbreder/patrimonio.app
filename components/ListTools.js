import styled from "styled-components";
import Delete from "./Delete";
import EditButton from "./EditButton";

export default function ListTools({ id, parent, slug }) {
    return (
        <ToolsContainer>
            <EditButton id={id} slug={slug}/>
            <Delete id={id} parent={parent} slug={slug} />
        </ToolsContainer>
    )
}

const ToolsContainer = styled.div`
    display: flex;
    div {
        margin-right: .5rem;
        min-width: 30px;
        height: 30px;
    }
`