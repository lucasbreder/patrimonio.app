import React, { Component } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import styled from 'styled-components'

import Editor, { composeDecorators } from '@draft-js-plugins/editor';

import createImagePlugin from '@draft-js-plugins/image';
import createAlignmentPlugin from '@draft-js-plugins/alignment';
import createFocusPlugin from '@draft-js-plugins/focus';
import createResizeablePlugin from '@draft-js-plugins/resizeable';
import createBlockDndPlugin from '@draft-js-plugins/drag-n-drop';
import createDragNDropUploadPlugin from '@draft-js-plugins/drag-n-drop-upload';
import createVideoPlugin from '@draft-js-plugins/video';
import mockUpload from '../editor/mockUpload';

import '@draft-js-plugins/image/lib/plugin.css'
import '@draft-js-plugins/focus/lib/plugin.css'
import '@draft-js-plugins/alignment/lib/plugin.css'
import 'draft-js/dist/Draft.css';

import EditorTools from "../editor/EditorTools";
import Validation from '../Validation';

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const videoPlugin = createVideoPlugin();
const { AlignmentTool } = alignmentPlugin;

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator,
);

const imagePlugin = createImagePlugin({ decorator });

const dragNDropFileUploadPlugin = createDragNDropUploadPlugin({
  handleUpload: mockUpload,
  addImage: imagePlugin.addImage,
});

const plugins = [
  dragNDropFileUploadPlugin,
  blockDndPlugin,
  focusPlugin,
  alignmentPlugin,
  resizeablePlugin,
  imagePlugin,
  videoPlugin
];

// ----------------------------------------

function myBlockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    if (type === 'header-one') {
      return 'header-one';
    }
    if (type === 'unstyled') {
      return 'unstyled';
    }
    if (type === 'header-two') {
      return 'header-two';
    }
    if (type === 'paragraph') {
      return 'paragraph';
    }
    if (type === 'left-block') {
      return 'left-block';
    }
    if (type === 'right-block') {
      return 'right-block';
    }
    if (type === 'center-block') {
      return 'center-block';
    }
    if (type === 'link') {
      return 'link';
    }
}

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity()
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      )
    },
    callback
  )
}

function Link(props) {
  const {url} = props.contentState.getEntity(props.entityKey).getData()
  return (
    <LinkContainer>
      <a href={url}>
        {props.children}
      </a>
    </LinkContainer>
  )
}

const linkDecorator = [
  {
    strategy: findLinkEntities,
    component: Link,
  },
]


export default class EditorInput extends Component {

  constructor(props) {
    super(props);

    this.state = {
        editorState:
          this.props.data
          ? EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.data)))
          : EditorState.createEmpty(),
      }
  }

  onChange = (editorState) => this.setState({editorState});

  render() {
    return (
      <>
        <EditorTools editorState={this.state.editorState} setEditorState={this.onChange} />
        <EditorContainer>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            blockStyleFn={myBlockStyleFn}
            placeholder="Digite seu texto aqui..."
            decorators={linkDecorator}
          />
          <AlignmentTool />
          <Validation validation={this.props.validation} name={this.props.params.name} />
          <input type='hidden' name={this.props.params.name} value={JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))} />  
        </EditorContainer>
      </>
    );
  }
}

const EditorContainer = styled.div`
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 15px;
  margin: 1rem 0;
  overflow: auto;

  a {
    color: blue;
    text-decoration: underline;
  }
  .header-one {
    font-size: 3rem;
    margin: .8rem 0;
  }
  .header-two {
    font-size: 2rem;
    margin: .8rem 0;
  }
  .paragraph, .unstyled {
    font-size: 1rem;
    margin: .8rem 0;
  }
  .left-block * {
    text-align: left;
  }
  .center-block * {
    text-align: center;
  }
  .right-block * {
    text-align: right;
  }
  .editor {
    box-sizing: border-box;
    cursor: text;
    padding: 16px;
    border-radius: 2px;
    margin-bottom: 2em;
    background: #fefefe;
  }
  
  .editor:global(.public-DraftEditor-content) {
    min-height: 140px;
  }
  
  .options {
    margin-bottom: 20px;
  }
  .link {
    color: blue;
    text-decoration: underline;
  }
`

const LinkContainer = styled.span`
  a {
    color: '#3b5998';
    text-decoration: 'underline';
  }

`