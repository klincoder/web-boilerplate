// Import resources
import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

// Import custom files
import tw from "../styles/twStyles";
import TiptapMenu from "./TiptapMenu";
import { handleSliceString } from "../config/functions";

// Component
const TiptapEditor = ({ name, label, contentState, setContentState }) => {
  // Define editor state
  const editor = useEditor({
    // <p>Hello World! 🌎️</p>
    content: contentState || "",
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        validate: (href) => /^https?:\/\//.test(href),
        openOnClick: false,
      }),
    ], // close extensions
    editorProps: {
      attributes: {
        class:
          "border-2 rounded-lg bg-white px-6 py-3 min-h-screen overflow-auto",
      },
    }, // close editorProps
    onUpdate: ({ editor }) => {
      //const jsonVal = editor.getJSON();
      const htmlVal = editor.getHTML();
      const textVal = handleSliceString(editor.getText(), 0, 150);
      setContentState({ htmlVal, textVal });
    }, // close onUpdate
  });

  // Debug
  //console.log("Debug tiptapEditor: ");

  // Return component
  return (
    <>
      {/** Label */}
      {label && (
        <label
          htmlFor={name}
          className="form-label inline-block text-sm font-bold mb-1"
        >
          {label}
        </label>
      )}

      {/** Menu bar */}
      <TiptapMenu editor={editor} />

      {/** Content editor */}
      <EditorContent editor={editor} name={name} />
    </>
  ); // close return
}; // close component

// Export
export default TiptapEditor;
