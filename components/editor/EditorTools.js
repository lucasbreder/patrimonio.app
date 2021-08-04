import styled from 'styled-components'
import { EditorState, RichUtils  } from 'draft-js';
import { useState } from 'react';
import createVideoPlugin from '@draft-js-plugins/video';

export default function EditorTools({ editorState, setEditorState }) {

  const [showPrompt, setShowPrompt] = useState(false)
  const [showVideoPrompt, setShowVideoPrompt] = useState(false)

  const videoPlugin = createVideoPlugin();

  function setLink(event, url) {
    
    event.preventDefault()
    const contentState = editorState.getCurrentContent();

    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      {url: url}
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

   // Apply entity
   const nextEditorState = EditorState.set(editorState, 
    { currentContent: contentStateWithEntity }
  );

    setEditorState( 
      RichUtils.toggleLink(
        nextEditorState,
        nextEditorState.getSelection(),
        entityKey
      )
    )

  }

  function setVideo(event, url) {
    
    event.preventDefault()
    setEditorState(
      videoPlugin.addVideo(editorState, { src: url })
    )
    
  }

  function removeLink(event) {
    event.preventDefault();
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      setEditorState(
        RichUtils.toggleLink(editorState, selection, null),
      );
    }
  }

  function onToolClick(style, event) {
      event.preventDefault()
      setEditorState(RichUtils.toggleInlineStyle(editorState, style))    
  }
    
  function onToolBlockClick(style, event) {
      event.preventDefault()
      setEditorState(RichUtils.toggleBlockType(editorState, style))    
  }

  function showPromptLink(event, show) {
    setShowPrompt(show)
  }

  function showPromptVideo(event, show) {
    setShowVideoPrompt(show)
  }

  return (
      <EditorToolsContainer>
      <div className="bold" onMouseDown={(event) => { onToolClick('BOLD', event) }}></div>
      <div className="italic" onMouseDown={(event) => { onToolClick('ITALIC', event) }}></div>
      <span></span>
      <div className="h1" onMouseDown={(event) => { onToolBlockClick('header-one', event) }}></div>
      <div className="h2" onMouseDown={(event) => { onToolBlockClick('header-two', event) }}></div>
      <div className="paragraph" onMouseDown={(event) => { onToolBlockClick('paragraph', event) }}></div>
      <span></span>
      <div className="list" onMouseDown={(event) => { onToolBlockClick('unordered-list-item', event) }}></div>
      <div className="list-number" onMouseDown={(event) => { onToolBlockClick('ordered-list-item', event) }}></div>
      <span></span>
      <div className="left" onMouseDown={(event) => { onToolBlockClick('left-block', event) }}></div>
      <div className="center" onMouseDown={(event) => { onToolBlockClick('center-block', event) }}></div>
      <div className="right" onMouseDown={(event) => { onToolBlockClick('right-block', event) }}></div>
      {/* <span></span>
      <div className="image" onMouseDown={(event) => { onToolBlockClick('right-block', event) }}></div> */}
      <span></span>
      <div className="link" onMouseDown={(event) => { showPromptLink(event, true) }}>
        {
          showPrompt
          ? <LinkPrompt>
            <input placeholder="http://..." onBlur={(event) => { showPromptLink(event, false) }} onChange={(event) => { setLink(event, event.target.value) }} type="url" name="urlLink" />
          </LinkPrompt>
          : ""
        }
      </div>
      <div className="unlink" onMouseDown={(event) => { removeLink(event) }}></div>
      <div className="video" onMouseDown={(event) => { showPromptVideo(event, true) }}>
        {
          showVideoPrompt
          ? <LinkPrompt>
            <input placeholder="http://..." onBlur={(event) => { showPromptVideo(event, false) }} onChange={(event) => { setVideo(event, event.target.value) }} type="url" name="urlVideo" />
          </LinkPrompt>
          : ""
        }
      </div>
    </EditorToolsContainer>
  )
}

const EditorToolsContainer = styled.div`
display: flex;
justify-content: center;
position: relative;
margin-bottom: -2rem;

  div {
    display: inline-block;
    padding: 1rem;
    border-radius: 8px;
    background-color: ${props => props.theme.featureColor};
    background-position: center;
    background-repeat: no-repeat;
    background-size: auto 80%;
    text-align: center;
    color: #fff;
    font-weight: bold;
    font-size: .9rem;
    margin: 0 .2rem;
    cursor: pointer;
  }
  span {
    display: block;
    background-color: ${props => props.theme.featureColor};
    width: 3px;
    border-radius: 150px;
    margin: 0 1rem;
  }
  .bold {
    background-image: url('/icons/bold.svg');
  }
  .italic {
    background-image: url('/icons/italic.svg');
  }
  .h1 {
    background-image: url('/icons/h1.svg');
  }
  .h2 {
    background-image: url('/icons/h2.svg');
  }
  .paragraph {
    background-image: url('/icons/paragraph.svg');
  }
  .list {
    background-image: url('/icons/list.svg');
  }
  .list-number {
    background-image: url('/icons/list-number.svg');
  }
  .left {
    background-image: url('/icons/left.svg');
  }
  .center {
    background-image: url('/icons/center.svg');
  }
  .right {
    background-image: url('/icons/right.svg');
  }
  .image {
    background-image: url('/icons/image.svg');
  }
  .link {
    background-image: url('/icons/link.svg');
    position: relative;
  }
  .unlink {
    background-image: url('/icons/unlink.svg');
  }
  .video {
    background-image: url('/icons/video.svg');
    position: relative;
  }
`

const LinkPrompt = styled.div`
  position: absolute;
  top: 35px;
  left: 0;
  z-index: 99;
`