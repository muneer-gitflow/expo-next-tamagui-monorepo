import React, { useState } from 'react';
import {
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  TextAlignCenterIcon,
} from '@shopify/polaris-icons';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import { Icon } from '@shopify/polaris';

const TiptapEditor = () => {
  const [wordCount, setWordCount] = useState(0);

  // Initialize the editor with required extensions
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      FontFamily.configure({
        types: ['textStyle'],
      }),
      TextAlign.configure({
        types: ['paragraph'],
      }),
    ],
    content: '<p>Welcome to our online store...</p>',
    onUpdate({ editor }) {
      // Update word count
      const text = editor.getText();
      setWordCount(text.trim().split(/\s+/).length);
    },
  });

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <>
      <div className="htmlEditor">
        <div className="htmlEditorHeader">
          <select className="fontFamily" onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}>
            <option value="Arial">Arial</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="PT Serif">PT Serif</option>
          </select>
          <button onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().toggleBold()}>
            <Icon source={TextBoldIcon} tone="base" />
          </button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().toggleItalic()}>
            <Icon source={TextItalicIcon} tone="base" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().toggleUnderline()}
          >
            <Icon source={TextUnderlineIcon} tone="base" />
          </button>
          <button onClick={() => editor.chain().focus().setTextAlign('left').run()}>
            <Icon source={TextAlignLeftIcon} tone="base" />
          </button>
          <button onClick={() => editor.chain().focus().setTextAlign('center').run()}>
            <Icon source={TextAlignCenterIcon} tone="base" />
          </button>
          <button onClick={() => editor.chain().focus().setTextAlign('right').run()}>
            <Icon source={TextAlignRightIcon} tone="base" />
          </button>
        </div>
        <div className="htmlEditorBody">
          <EditorContent
            editor={editor}
            style={{
              fontFamily: editor.getAttributes('textStyle').fontFamily || 'Arial',
              fontSize: editor.getAttributes('textStyle').fontSize || '16px',
            }}
          />
          <span>{wordCount}/500</span>
        </div>
      </div>
    </>
  );
};

export default TiptapEditor;
