// Import resources
import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { useFormikContext } from "formik";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

// Import custom files
import tw from "../styles/twStyles";
import TiptapMenu from "./TiptapMenu";
import CustomHelperText from "./CustomHelperText";
import { handleSliceString } from "../config/functions";

// Component
const TiptapEditorForm = ({ name, label, excerptName, helperText }) => {
  // Define formik context
  const { values, errors, setFieldValue } = useFormikContext();

  // Define editor state
  const editor = useEditor({
    content: values[name],
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
      setFieldValue(name, htmlVal);
      setFieldValue(excerptName, textVal);
    }, // close onUpdate
  });

  // Debug
  //console.log("Debug tiptapEditorForm: ", values[name]);

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

      {/** Helper msg */}
      {helperText && (
        <CustomHelperText visible={helperText} title={helperText} />
      )}

      {/** Error msg */}
      <CustomHelperText isError title={errors[name]} visible={errors[name]} />
    </>
  ); // close return
}; // close component

// Export
export default TiptapEditorForm;
