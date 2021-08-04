import { useRef, useState } from "react"
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import styled from 'styled-components'
import findValidation from "../../helpers/findValidation";


import Editor, { composeDecorators } from '@draft-js-plugins/editor';

import createImagePlugin from '@draft-js-plugins/image';
import createAlignmentPlugin from '@draft-js-plugins/alignment';
import createFocusPlugin from '@draft-js-plugins/focus';
import createResizeablePlugin from '@draft-js-plugins/resizeable';
import createBlockDndPlugin from '@draft-js-plugins/drag-n-drop';
import createDragNDropUploadPlugin from '@draft-js-plugins/drag-n-drop-upload';
import editorStyles from '../editor/editorStyles.module.css';
import mockUpload from '../editor/mockUpload';

import '@draft-js-plugins/image/lib/plugin.css'
import '@draft-js-plugins/focus/lib/plugin.css'

import EditorTools from "../editor/EditorTools";

import SimpleResizeableEditor from "./Test"

export default function Textarea({ params, data, validation }) {

  const editor = useRef()

  const focusPlugin = createFocusPlugin();
  const resizeablePlugin = createResizeablePlugin();
  const blockDndPlugin = createBlockDndPlugin();
  const alignmentPlugin = createAlignmentPlugin();
  const { AlignmentTool } = alignmentPlugin;
  
  const decorator = composeDecorators(
    resizeablePlugin.decorator,
    alignmentPlugin.decorator,
    focusPlugin.decorator,
    blockDndPlugin.decorator
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
  ];

  function myBlockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    if (type === 'header-one') {
      return 'header-one';
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
  }
  
  function focus () {
    editor.current.focus();
  };

  const [editorState, setEditorState] = useState(
    () => data ? EditorState.createWithContent(convertFromRaw(JSON.parse(data))) : EditorState.createEmpty(),
);
  

    if(editorState) {
        return (
          <>
            <EditorTools editorState={editorState} setEditorState={setEditorState}/>
            <EditorContainer>
              <div className={editorStyles.editor} onClick={() => {focus()}}>
              <p>{params.name}</p>
                <Editor
                  ref={editor}  
                  editorState={editorState}
                  onChange={setEditorState}
                  blockStyleFn={myBlockStyleFn}
                  plugins={plugins}
                />
                <AlignmentTool />
              <p>{findValidation(validation, params.name)}</p>
              </div>
              <input type='hidden' name={params.name} value={JSON.stringify(convertToRaw(editorState.getCurrentContent()))} />
              </EditorContainer>
        </>
    )
    }
    return "Carregando"
}

const EditorContainer = styled.div`
  background-color: #fff;
  padding: 2rem 3rem;
  border-radius: 15px;
  margin: 1rem 0;
`