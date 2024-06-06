import React, { useEffect, useState } from "react";

import { ContentState, convertToRaw, EditorState, Modifier } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


export const RichWysiwygEditor = ( {onChange, value, mentionSuggestions, id } : 
    { onChange: (...event: any[]) => void, value: any, mentionSuggestions?: {text: string, value: string}[], id: string | undefined }) => {

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [updated, setUpdated] = useState(false);


    useEffect(() => {
        if (!updated) {
          const defaultValue = value ? value : "";
          const blocksFromHtml = htmlToDraft(defaultValue);
          const contentState = ContentState.createFromBlockArray(
            blocksFromHtml.contentBlocks,
            blocksFromHtml.entityMap
          );
          const newEditorState = EditorState.createWithContent(contentState);
          setEditorState(newEditorState);
        }
      }, [value, id]);
    
      const onEditorStateChange = (editorState: EditorState) => {
        setUpdated(true);
        setEditorState(editorState);
    
        return onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
      };

      return (
        <React.Fragment>
          <div className="editor">
            <Editor
              //spellCheck
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
              editorStyle={{minHeight: '250px'}}
              
              
              mention={{
                separator: ' ',
                trigger: '@',
                suggestions: mentionSuggestions || [],
              }}

              hashtag={{
                separator: ' ',
                trigger: '#',
                suggestions: mentionSuggestions || [],
              }}
            />
          </div>
        </React.Fragment>
      );
    
}



