// Import resources
import React, { useCallback } from "react";
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaCode,
  FaListUl,
  FaListOl,
  FaQuoteLeft,
  FaParagraph,
  FaHeading,
  FaUndo,
  FaRedo,
  FaUnderline,
  FaLink,
  FaUnlink,
} from "react-icons/fa";

// Import custom files
import tw from "../styles/twStyles";
import CustomButton from "./CustomButton";

// Component
function TiptapMenu({ editor, divClass }) {
  // Define left menu array
  const leftMenuArr = [
    {
      id: "123",
      title: "bold",
      icon: <FaBold />,
      onClick: () => editor.chain().focus().toggleBold().run(),
    },
    {
      id: "456",
      title: "underline",
      icon: <FaUnderline />,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
    },
    {
      id: "789",
      title: "italic",
      icon: <FaItalic />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      id: "1011",
      title: "link",
      icon: <FaLink />,
      onClick: () => handleToggleLink(),
    },
    {
      id: "1213",
      title: "link",
      icon: <FaUnlink />,
      onClick: () => editor.chain().focus().unsetLink().run(),
    },
    {
      id: "1415",
      title: "heading",
      level: 1,
      isHeading: true,
    },
    {
      id: "1617",
      title: "heading",
      level: 2,
      isHeading: true,
    },
    {
      id: "1819",
      title: "heading",
      level: 3,
      isHeading: true,
    },
    {
      id: "2021",
      title: "heading",
      level: 4,
      isHeading: true,
    },
    {
      id: "2022",
      title: "heading",
      level: 5,
      isHeading: true,
    },
    {
      id: "2023",
      title: "heading",
      level: 6,
      isHeading: true,
    },
    {
      id: "2024",
      title: "strike",
      icon: <FaStrikethrough />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
    },
    {
      id: "2025",
      title: "code",
      icon: <FaCode />,
      onClick: () => editor.chain().focus().toggleCode().run(),
    },
    {
      id: "2026",
      title: "bulletList",
      icon: <FaListUl />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      id: "2027",
      title: "blockquote",
      icon: <FaQuoteLeft />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
    },
    {
      id: "2028",
      title: "orderedList",
      icon: <FaListOl />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
    },
  ]; // close leftMenuArr

  // Define right menu array
  const rightMenuArr = [
    {
      id: "123",
      title: "undo",
      icon: <FaUndo />,
      onClick: () => editor.chain().focus().undo().run(),
    },
    {
      id: "456",
      title: "redo",
      icon: <FaRedo />,
      onClick: () => editor.chain().focus().redo().run(),
    },
  ]; // close rightMenuArr

  // Debug
  //console.log("Debug tiptapMenu: ",)

  // FUNCTIONS
  // HANDLE TOGGLE LINK
  const handleToggleLink = useCallback(() => {
    // Define variables
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    // If url
    if (url === null) {
      return;
    } // close if
    // If url === ""
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    } // close if
    // Update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  // If no editor
  if (!editor) {
    return null;
  } // close if

  // Return component
  return (
    <div
      className={`flex flex-row justify-between p-3 mb-4 bg-white rounded-lg ${divClass}`}
    >
      {/** COL 1 */}
      <div className="flex flex-row flex-wrap items-center gap-2 mb-2">
        {/** Loop leftMenuArr */}
        {leftMenuArr?.map((item) => {
          // Define variables
          const itemID = item?.id;
          const title = item?.title;
          const icon = item?.icon;
          const onClickNormal = item?.onClick;
          const isHeading = item?.isHeading;
          const level = item?.level;
          const onClickHeading = () =>
            editor.chain().focus().toggleHeading({ level: level }).run();
          const headingClass = editor.isActive(title, { level: level })
            ? tw?.btnChipDark
            : tw?.btnChip;
          const normalClass = editor.isActive(title)
            ? tw?.btnChipDark
            : tw?.btnChip;
          const isDisabled = !editor.isActive("link");
          // Return
          return (
            <CustomButton
              isNormal
              key={itemID}
              onClick={isHeading ? onClickHeading : onClickNormal}
              btnClass={isHeading ? headingClass : normalClass}
            >
              {isHeading ? "H" + level : icon}
            </CustomButton>
          ); // close return
        })}

        {/** Loop rightMenuArr */}
        {rightMenuArr?.map((item) => (
          <CustomButton
            isNormal
            key={item?.id}
            onClick={item?.onClick}
            btnClass={
              editor.isActive(item?.title) ? tw?.btnChipDark : tw?.btnChip
            }
          >
            {item?.icon}
          </CustomButton>
        ))}
      </div>
    </div>
  ); // close return
} // close component

// Export
export default TiptapMenu;
