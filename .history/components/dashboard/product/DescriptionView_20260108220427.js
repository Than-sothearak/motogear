"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function DescriptionView({ content }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false, // 🔥 IMPORTANT
  });

  if (!editor) return null;

  return <EditorContent editor={editor} />;
}
